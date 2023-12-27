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
