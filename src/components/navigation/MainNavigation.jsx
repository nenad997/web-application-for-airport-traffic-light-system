import React, { useContext } from "react";
import { MdOutlineLocalAirport } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import classes from "./MainNavigation.module.css";
import { getLoggedInUserId } from "../../auth/authentication";
import { AppContext } from "../../store/AppContext";

const MainNavigation = () => {
  const { showProfilePortal } = useContext(AppContext);

  const userId = getLoggedInUserId();
  const isUserLoggedIn = Boolean(userId);

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
              to={`flights?day=${new Date().toISOString().split("T")[0]}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Flights
            </NavLink>
          </li>
          {isUserLoggedIn && (
            <li style={{ position: "absolute", right: 0 }} title="Profile">
              <button onClick={showProfilePortal}>
                <CgProfile />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
