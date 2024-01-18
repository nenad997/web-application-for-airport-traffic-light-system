import React, { Suspense, Fragment } from "react";
import {
  useParams,
  json,
  useLoaderData,
  redirect,
  useActionData,
  defer,
  Await,
} from "react-router-dom";

import { getToken } from "../authentication";
import Layout from "../components/UI/Layout";
import EditForm from "../components/UI/CustomForm";
import DeleteForm from "../components/UI/DeleteForm";
import AllFlights from "../components/AllFlights";

const Edit = () => {
  const { flightId } = useParams();
  const { flight, flights } = useLoaderData();
  const errorData = useActionData();

  const filterTerm = flight?.type;

  return (
    <Layout backgroundColor="#FFFFFF" marginTop="2rem" marginBottom={"10rem"}>
      <Suspense fallback={<p className="center">Loading flight...</p>}>
        <Await resolve={flight}>
          {(loadedFlight) => (
            <Fragment>
              <EditForm
                type="edit"
                flight={loadedFlight}
                method="POST"
                errors={errorData}
              />
              <DeleteForm
                action="/delete-flight"
                name="flightId"
                value={flightId}
                text="Delete Flight"
              />
            </Fragment>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p className="center">Loading Flights...</p>}>
        <Await resolve={flights}>
          {(loadedFlights) => (
            <AllFlights
              loadedFlights={loadedFlights}
              idFilter={flightId}
              filterTerm={filterTerm}
            />
          )}
        </Await>
      </Suspense>
    </Layout>
  );
};

export default Edit;

async function loadFlight(flightId) {
  const token = getToken();

  if (!flightId) {
    return json({ message: "Invalid flightId" }, { status: 404 });
  }

  const graphqlQuery = {
    query: `
      {
        getFlight(flightId: "${flightId}") {
          _id
          airport
          flightNumber
          scheduleTime
          avioCompany
          terminal
          status
          type
          createdAt
          updatedAt
        }
      }
    `,
  };

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return json({ message: "Could not fetch a flight" }, { status: 422 });
  }

  const responseData = await response.json();

  return responseData.data.getFlight;
}

async function loadFlights() {
  const graphqlQuery = {
    query: `
    {
      getFlights {
        _id
        airport
        flightNumber
        scheduleTime
        avioCompany
        terminal
        status
        type
        createdAt
        updatedAt
      }
    }
    `,
  };

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return json({ message: "Could not fetch flights" }, { status: 404 });
  }

  const responseData = await response.json();

  if (responseData && !responseData.data.getFlights.length) {
    return json({ message: "No flights for this filter" }, { status: 412 });
  }

  return responseData.data.getFlights;
}

export async function loader({ request, params }) {
  const token = getToken();
  const { flightId } = params;

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    flight: await loadFlight(flightId),
    flights: await loadFlights(),
  });
}

export async function action({ request, params }) {
  const { flightId } = params;

  const token = getToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  const formData = await request.formData();
  const {
    airport,
    flightNumber,
    scheduleTime,
    avioCompany,
    terminal,
    status,
    type,
  } = Object.fromEntries(formData);

  if (!flightNumber) {
    return json(
      { message: "Flight number property must be set" },
      { status: 400 }
    );
  }

  const graphqlQuery = {
    query: `
      mutation {
        updateFlight(flightId: "${flightId}", input: { 
          airport: "${airport}",
          flightNumber: "${flightNumber.toUpperCase()}",
          scheduleTime: "${scheduleTime}",
          avioCompany: "${avioCompany}",
          terminal: "${terminal}",
          status: "${status}",
          type: "${type}" 
        }) {
          _id
          createdAt
        }
      }
    `,
  };

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return json({ message: "Could not update a flight" }, { status: 422 });
  }

  const responseData = await response.json();

  const { createdAt } = responseData.data.updateFlight;

  let day;

  var date = new Date();

  date.setDate(date.getDate() - 1);

  const previousDayParam = date.toISOString().split("T")[0];

  const dateQueryParam = createdAt.split("T")[0];

  const splitsObject = {
    dateQuery: +dateQueryParam.split("-")[2],
    previousDay: +previousDayParam.split("-")[2],
  };

  switch (true) {
    case dateQueryParam === new Date().toISOString().split("T")[0]: {
      day = new Date().toISOString().split("T")[0];
      break;
    }
    case splitsObject.previousDay === splitsObject.dateQuery: {
      day = previousDayParam;
      break;
    }
    case splitsObject.dateQuery + 1 !== splitsObject.previousDay ||
      splitsObject.dateQuery + 1 === splitsObject.previousDay: {
      day = "all";
      break;
    }
    default: {
      throw new Error("An Error!");
    }
  }

  let pathName;

  if (type === "arrival") pathName = `/flights?day=${day}`;
  if (type === "departure") pathName = `/flights/departures?day=${day}`;

  return redirect(pathName);
}
