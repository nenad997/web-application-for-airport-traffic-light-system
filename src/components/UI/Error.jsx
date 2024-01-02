import React from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Error.module.css";

const Error = () => {
  const { pathname: invalidPath } = useLocation();

  return (
    <div className={classes.error}>
      <h1>
        The path <span style={{ color: "red" }}>{`(${invalidPath})`}</span> you
        require does not exist
      </h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error;
