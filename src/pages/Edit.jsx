import React from "react";
import {
  useParams,
  Form,
  json,
  useLoaderData,
  redirect,
  useActionData,
} from "react-router-dom";

import { getToken } from "../authentication";
import Layout from "../components/UI/Layout";
import CustomForm from "../components/UI/CustomForm";
import classes from "./Page.module.css";

const Edit = () => {
  const { flightId } = useParams();
  const flight = useLoaderData();
  const actionData = useActionData();

  return (
    <Layout backgroundColor="#FFFFFF" marginTop="2rem" marginBottom={0}>
      <CustomForm
        type="edit"
        flight={flight}
        method="POST"
        errors={actionData}
      />
      <Form method="POST" action="/delete-flight">
        <div className={classes["btn-container"]}>
          <input type="hidden" name="flightId" value={flightId} />
          <button type="submit">Delete Flight</button>
        </div>
      </Form>
    </Layout>
  );
};

export default Edit;

export async function loader({ request, params }) {
  const token = getToken();

  if (!token) {
    return redirect("/login");
  }

  const { flightId } = params;

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

export async function action({ request, params }) {
  const { flightId } = params;

  const token = getToken();

  if (!token) {
    return redirect("/login");
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
