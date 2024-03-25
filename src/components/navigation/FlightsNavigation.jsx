import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { GiAirplaneArrival, GiCommercialAirplane } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import classes from "./FlightsNavigation.module.css";
import User from "../auth/User";
import { AppContext } from "../../store/AppContext";

const FlightsNavigation = () => {
  const { isProfileVisible } = useContext(AppContext);

  const profilePortal = createPortal(
    <User />,
    document.getElementById("modal")
  );

  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <ul>
          <li className={classes["responsive-link"]}>
            <NavLink
              to={`/flights?day=${new Date().toISOString().split("T")[0]}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              <GiAirplaneArrival />
              Arrivals
            </NavLink>
          </li>
          <li className={classes["responsive-link"]}>
            <NavLink
              to={`departures?day=${new Date().toISOString().split("T")[0]}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <GiCommercialAirplane />
              Departures
            </NavLink>
          </li>
        </ul>
      </nav>
      {isProfileVisible && profilePortal}
    </React.Fragment>
  );
};

export default FlightsNavigation;
