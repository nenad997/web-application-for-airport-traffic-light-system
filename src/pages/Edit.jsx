import React from "react";
import {
  useParams,
  Form,
  json,
  useLoaderData,
  redirect,
} from "react-router-dom";

import Layout from "../components/UI/Layout";
import CustomForm from "../components/UI/CustomForm";
import classes from "./Page.module.css";

const Edit = () => {
  const { flightId } = useParams();
  const flight = useLoaderData();

  return (
    <Layout backgroundColor="#FFFFFF" marginTop="2rem" marginBottom={0}>
      <CustomForm type="edit" flight={flight} method="POST" />
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
    return json({ message: "Could not fetch a flight" }, { status: 422 });
  }

  const responseData = await response.json();

  return responseData.data.getFlight;
}

export async function action({ request, params }) {
  const { flightId } = params;

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

  const graphqlQuery = {
    query: `
      mutation {
        updateFlight(flightId: "${flightId}", input: { 
          airport: "${airport}",
          flightNumber: "${flightNumber}",
          scheduleTime: "${scheduleTime}",
          avioCompany: "${avioCompany}",
          terminal: "${terminal}",
          status: "${status}",
          type: "${type}" 
        }) {
          _id
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
    return json({ message: "Could not update a flight" }, { status: 422 });
  }

  await response.json();

  let pathName;

  if (type === "arrival") pathName = "/flights";
  if (type === "departure") pathName = "/flights/departures";

  return redirect(pathName);
}
