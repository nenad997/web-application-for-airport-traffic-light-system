import React from "react";
import { Link } from "react-router-dom";

import classes from "./Pagination.module.css";

const Pagination = () => {
  var date = new Date();

  const today = date.toISOString().split("T")[0];

  date.setDate(date.getDate() - 1);

  const yesterday = date.toISOString().split("T")[0];

  return (
    <div className={classes.pagination}>
      <ul>
        <li>
          <Link to={`?day=${yesterday}`}>Yesterday</Link>
        </li>
        <li>
          <Link to={`?day=${today}`}>Today</Link>
        </li>
        <li>
          <Link to="?day=all">All Flights</Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
