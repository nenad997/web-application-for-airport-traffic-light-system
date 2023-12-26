import React from "react";

import classes from "./Flight.module.css";

const Flight = ({
  departureAirport,
  flightNumber,
  scheduleTime,
  avioCompany,
  exitTerminal,
  status,
  id
}) => {
  const clickHandler = () => {
    console.log(id);
  };

  return (
    <div className={classes.container} onClick={clickHandler}>
      <span>{departureAirport}</span>
      <span>{flightNumber}</span>
      <span>{scheduleTime}</span>
      <span>{avioCompany}</span>
      <span>{exitTerminal}</span>
      <span>{status}</span>
    </div>
  );
};

export default Flight;
