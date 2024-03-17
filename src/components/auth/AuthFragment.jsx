import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";

import FlightsNavigation from "../navigation/FlightsNavigation";
import { getToken } from "../../auth/authentication";
import classes from "./AuthFragment.module.css";

const AuthFragment = ({ children }) => {
  const { pathname } = useLocation();
  const { flightId } = useParams();

  const token = getToken();

  const pathCondition =
    pathname === "/flights" || pathname === "/flights/departures";

  const authCondition = pathCondition && token;

  return (
    <div className={classes["auth-fragment"]}>
      {!flightId && pathCondition && <FlightsNavigation />}
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
