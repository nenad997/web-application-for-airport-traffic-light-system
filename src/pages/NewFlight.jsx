import React from "react";
import { json, redirect, useActionData } from "react-router-dom";

import { getToken } from "../authentication";
import Layout from "../components/UI/Layout";
import FlightForm from "../components/FlightForm";

const NewFlight = () => {
  const errorData = useActionData();

  return (
    <Layout marginTop={"2rem"} marginBottom={"5rem"}>
      <FlightForm errors={errorData} />
    </Layout>
  );
};

export default NewFlight;

export async function action({ request, params }) {
  const token = getToken();

  if (!token) {
    return json({ message: "Not Authorized!" }, { status: 401 });
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
        createFlight(input: { airport: "${airport}",
         flightNumber: "${flightNumber.toUpperCase()}",
         scheduleTime: "${scheduleTime}",
         avioCompany: "${avioCompany}",
         terminal: "${terminal}",
         status: "${status}",
         type: "${type}" }) {
          _id
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
    return json({ message: "Failed to add flight" }, { status: 409 });
  }

  await response.json();

  if (type === "arrival") {
    return redirect(`/flights?day=${new Date().toISOString().split("T")[0]}`);
  }
  return redirect(
    `/flights/departures?day=${new Date().toISOString().split("T")[0]}`
  );
}

export async function loader() {
  const token = getToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
