import React from "react";
import { Outlet, useLocation, defer, json } from "react-router-dom";

import AuthFragment from "../components/auth/AuthFragment";
import Container from "../components/UI/Container";
import Pagination from "../components/Pagination";

const FlightsLayout = () => {
  const { pathname, search } = useLocation();

  const pathCondition =
    pathname === "/flights" || pathname === "/flights/departures";

  return (
    <AuthFragment>
      {search.includes("day") && <Pagination />}
      {pathCondition && (
        <Container
          type={
            pathname === "/flights"
              ? "Arrival"
              : pathname === "/flights/departures"
              ? "Destination"
              : ""
          }
        />
      )}
      <Outlet />
    </AuthFragment>
  );
};

export default FlightsLayout;

export async function loader() {
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
    return json({ message: "No fligts for this filter" }, { status: 412 });
  }

  return defer({
    flights: await responseData.data.getFlights,
  });
}
