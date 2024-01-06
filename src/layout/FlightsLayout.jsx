import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Outlet, Link, useLocation, defer } from "react-router-dom";

import { getToken } from "../authentication";
import FlightsNavigation from "../components/FlightsNavigation";
import classes from "./Layout.module.css";

const FlightsLayout = () => {
  const { pathname } = useLocation();

  const token = getToken();

  let condition =
    (pathname === "/flights" || pathname === "/flights/departures") && token;

  var date = new Date();
  
  const today = date.toISOString();

  date.setDate(date.getDate() - 1);

  const yesterday = date.toISOString();

  return (
    <>
      <FlightsNavigation />
      {condition && (
        <div className={classes["text-wrapper"]}>
          <h4>
            Click a flight you'd like to trigger actions{" "}
            <span>
              <FaRegHandPointDown />
            </span>
          </h4>
        </div>
      )}
      <div className={classes.pagination}>
        <ul>
          <li>
            <Link to={`?day=${yesterday}`}>Yesterday</Link>
          </li>
          <li>
            <Link to={`?day=${today}`}>Today</Link>
          </li>
          <li>
            <Link to={`?day=${true}`}>All Flights</Link>
          </li>
        </ul>
      </div>
      <Outlet />
      {condition && (
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
