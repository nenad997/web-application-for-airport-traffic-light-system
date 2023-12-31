import React from "react";
import { Link, useLocation } from "react-router-dom";

import { getToken } from "../authentication";
import classes from "./Flight.module.css";

const Flight = ({
  departureAirport,
  flightNumber,
  scheduleTime,
  avioCompany,
  exitTerminal,
  status,
  id,
}) => {
  const { pathname: currentPath } = useLocation();

  const token = getToken();

  let href = currentPath;

  if (token) {
    href = `/flights/${id}`;
  }

  return (
    <Link className={classes.link} to={href} title={token ? "Click Me" : ""}>
      <div className={classes.container}>
        <span>{departureAirport}</span>
        <span>{flightNumber}</span>
        <span>{scheduleTime}</span>
        <span>{avioCompany}</span>
        <span>{exitTerminal}</span>
        <span>{status}</span>
      </div>
    </Link>
  );
};

export default Flight;
