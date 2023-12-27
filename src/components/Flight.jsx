import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <Link to={`/flights/${id}`}>
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
