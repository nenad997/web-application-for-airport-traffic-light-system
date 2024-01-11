import React from "react";

import classes from "./Portal.module.css";

const Portal = ({ children }) => {
  return <dialog open className={classes.portal}>{children}</dialog>;
};

export default Portal;
