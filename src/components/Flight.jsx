import React from "react";
import { Link, useLocation } from "react-router-dom";

import { getToken } from "../authentication";
import classes from "./Flight.module.css";

const Flight = ({
  airport,
  flightNumber,
  scheduleTime,
  avioCompany,
  terminal,
  status,
  createdAt,
  _id,
  shouldPageRefresh = false,
}) => {
  const { pathname: currentPath, search } = useLocation();

  const token = getToken();

  var date = new Date();

  date.setDate(date.getDate() - 1);

  const previousDay = date.toISOString();

  let href = `${currentPath}?index&day=${search?.split("=")[1]?.split("T")[0]}`;

  if (currentPath === `/flights?day=${previousDay}` && !token) {
    href = `/flights?day=${previousDay}`;
  }

  if (token) {
    href = `/flights/${_id}`;
  }

  const humanReadableDate = new Date(createdAt).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const linkContent = (
    <div className={classes.container}>
      <span>{airport}</span>
      <span>{flightNumber}</span>
      <span>{scheduleTime}</span>
      <span>{humanReadableDate}</span>
      <span>{avioCompany}</span>
      <span>{terminal}</span>
      <span>{status}</span>
    </div>
  );

  let cmpHTML = (
    <Link className={classes.link} to={href} title={token ? "Click Me" : ""}>
      {linkContent}
    </Link>
  );

  if (shouldPageRefresh) {
    cmpHTML = (
      <a className={classes.link} href={href} title={token ? "Click Me" : ""}>
        {linkContent}
      </a>
    );
  }

  return cmpHTML;
};

export default Flight;
