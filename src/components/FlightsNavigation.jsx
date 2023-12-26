import React from "react";
import { GiAirplaneArrival, GiCommercialAirplane } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import classes from "./FlightsNavigation.module.css";

const FlightsNavigation = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="/flights"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <GiAirplaneArrival />
            Arrivals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="departures"
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
  );
};

export default FlightsNavigation;
