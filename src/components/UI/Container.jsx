import React from "react";

import classes from "./Container.module.css";

const Container = ({ type }) => {
  return (
    <div className={classes.container}>
      <span>{type}</span>
      <span>Flight Number</span>
      <span>Schedule Time</span>
      <span>Avio Company</span>
      <span>Exit Terminal</span>
      <span>Status</span>
    </div>
  );
};

export default Container;
