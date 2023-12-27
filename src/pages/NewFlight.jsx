import React from "react";
import { redirect } from "react-router-dom";

import FlightForm from "../components/FlightForm";

const NewFlight = () => {
  return <FlightForm />;
};

export default NewFlight;

export async function action({ request, params }) {
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

  const graphqQuery = {
    query: `
      mutation {
        createFlight(input: { airport: "${airport}", flightNumber: "${flightNumber}", scheduleTime: "${scheduleTime}", avioCompany: "${avioCompany}", terminal: "${terminal}", status: "${status}", type: "${type}" }) {
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
    body: JSON.stringify(graphqQuery),
  });

  const responseData = await response.json();

  console.log(responseData);

  console.log({
    airport,
    flightNumber,
    scheduleTime,
    avioCompany,
    terminal,
    status,
    type,
  });

  return redirect("/flights");
}
