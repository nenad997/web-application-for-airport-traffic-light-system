import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { getToken } from "../../authentication";
import FlightsNavigation from "../FlightsNavigation";
import classes from "./AuthFragment.module.css";

const AuthFragment = ({ children }) => {
  const { pathname } = useLocation();

  const token = getToken();

  const pathCondition =
    pathname === "/flights" || pathname === "/flights/departures";

  const authCondition = pathCondition && token;

  return (
    <div className={classes["auth-fragment"]}>
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
      {children}
      {authCondition && (
        <div className={classes["btn-wrapper"]}>
          <Link to="add-new-flight">
            <button title="Add a New Flight">New Flight</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthFragment;
