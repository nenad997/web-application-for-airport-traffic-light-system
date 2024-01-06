import React from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Pagination.module.css";

const Pagination = () => {
  const { search } = useLocation();

  const dateQueryParam = search.split("=")[1];
  console.log(dateQueryParam);

  var date = new Date();

  const today = date.toISOString().split("T")[0];

  date.setDate(date.getDate() - 1);

  const yesterday = date.toISOString().split("T")[0];

  console.log(yesterday);

  return (
    <div className={classes.pagination}>
      <ul>
        <li>
          <Link
            to={`?day=${yesterday}`}
            style={{ color: dateQueryParam === yesterday ? "white" : "black" }}
          >
            Yesterday
          </Link>
        </li>
        <li>
          <Link
            to={`?day=${today}`}
            style={{ color: dateQueryParam === today ? "white" : "black" }}
          >
            Today
          </Link>
        </li>
        <li>
          <Link
            to="?day=all"
            style={{ color: dateQueryParam === "all" ? "white" : "black" }}
          >
            All Flights
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
