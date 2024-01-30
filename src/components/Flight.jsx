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
  type,
  _id,
  shouldPageRefresh = false,
}) => {
  const { pathname: currentPath, search } = useLocation();

  const token = getToken();

  var date = new Date();

  date.setDate(date.getDate() - 1);

  const previousDay = date.toISOString();

  let href = `${currentPath}?index&day=${search?.split("=")[1]?.split("T")[0]}&edit=false`;

  if (currentPath === `/flights?day=${previousDay}` && !token) {
    href = `/flights?day=${previousDay}&edit=false`;
  }

  if (token) {
    href = `/flights/${_id}?edit=true`;
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

  const linkPropAttributes = {
    className: classes.link,
    title: token
      ? `${
          type.at(0).toUpperCase() + type.slice(1)
        } - Flight number: ${flightNumber}`
      : undefined,
    to: !shouldPageRefresh ? href : undefined,
    href: shouldPageRefresh ? href : undefined,
  };

  let cmpHTML = <Link {...linkPropAttributes}>{linkContent}</Link>;

  if (shouldPageRefresh) {
    cmpHTML = <a {...linkPropAttributes}>{linkContent}</a>;
  }

  return cmpHTML;
};

export default Flight;
