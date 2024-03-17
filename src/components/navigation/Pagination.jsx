import React from "react";
import { Link, useLocation } from "react-router-dom";

import paginationData from "../../data/paginationData";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const { search } = useLocation();

  const dateQueryParam = search.split("=")[1];

  return (
    <div className={classes.pagination}>
      <ul>
        {paginationData.map((pg, index) => (
          <li key={index}>
            <Link
              to={pg.href}
              className={
                dateQueryParam === pg.date
                  ? `${classes.item} ${classes["active-item"]}`
                  : classes.item
              }
            >
              {pg.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
