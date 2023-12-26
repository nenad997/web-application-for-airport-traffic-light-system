import React from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

import FlightsNavigation from "../components/FlightsNavigation";
import classes from "./Layout.module.css";

const FlightsLayout = () => {
  return (
    <>
      <FlightsNavigation />
      <div className={classes["text-wrapper"]}>
        <h4>
          Click a flight you'd like to trigger actions{" "}
          <span>
            <FaRegHandPointDown />
          </span>
        </h4>
      </div>
      <Outlet />
      <div className={classes["btn-wrapper"]}>
        <Link to="/add-new-flight">
          <button>New Flight</button>
        </Link>
      </div>
    </>
  );
};

export default FlightsLayout;
