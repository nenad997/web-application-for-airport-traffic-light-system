import React from "react";
import { MdOutlineLocalAirport } from "react-icons/md";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__heading}>
        <p>
          <MdOutlineLocalAirport />
          <span>
            <span>Se</span>
            <span>rb</span>
            <span>ia</span>
          </span>
        </p>
        <h2>
          <span>
            <span>Bel</span>
            <span>gr</span>
            <span>ade</span>
          </span>{" "}
          <MdOutlineLocalAirport />
        </h2>
      </div>
      <nav className={classes.header__nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`flights?day=${new Date().toISOString()}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Flights
            </NavLink>
          </li>
          <li>
            <NavLink
              to="practical-guide"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Practical Guide
            </NavLink>
          </li>
          <li>
            <NavLink
              to="parking-and-approach"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Parking & Approach
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
