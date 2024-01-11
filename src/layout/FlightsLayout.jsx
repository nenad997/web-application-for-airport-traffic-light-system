import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Outlet, Link, useLocation, defer } from "react-router-dom";

import { getToken } from "../authentication";
import Container from "../components/UI/Container";
import FlightsNavigation from "../components/FlightsNavigation";
import Pagination from "../components/Pagination";
import classes from "./Layout.module.css";

const FlightsLayout = () => {
  const { pathname, search } = useLocation();

  const token = getToken();

  const pathCondition =
    pathname === "/flights" || pathname === "/flights/departures";

  let authCondition = pathCondition && token;

  return (
    <>
      <FlightsNavigation />
      {authCondition && (
        <div className={classes["text-wrapper"]}>
          <h4>
            Click a flight you'd like to trigger actions{" "}
            <span>
              <FaRegHandPointDown />
            </span>
          </h4>
        </div>
      )}
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
      {authCondition && (
        <div className={classes["btn-wrapper"]}>
          <Link to="add-new-flight">
            <button title="Add a New Flight">New Flight</button>
          </Link>
        </div>
      )}
    </>
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

  try {
    const responseData = await response.json();

    if (!responseData.data) {
      return [];
    }
    return defer({
      flights: await responseData.data.getFlights,
    });
  } catch (err) {
    console.log(err);
  }
}
