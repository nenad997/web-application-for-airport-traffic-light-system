import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Outlet, Link, useLocation } from "react-router-dom";

import FlightsNavigation from "../components/FlightsNavigation";
import classes from "./Layout.module.css";

const FlightsLayout = () => {
  const { pathname } = useLocation();

  let condition = pathname === "/flights" || pathname === "/flights/departures";

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
      <Outlet />
      {condition && (
        <div className={classes["btn-wrapper"]}>
          <Link to="/add-new-flight">
            <button>New Flight</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default FlightsLayout;

export async function loader() {
  const graphqQuery = {
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

  try {
    const responseData = await response.json();

    if (!responseData.data) {
      return [];
    }
    return responseData.data.getFlights;
  } catch (err) {
    console.log(err);
  }
}
