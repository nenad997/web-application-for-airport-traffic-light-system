import React from "react";
import { Link } from "react-router-dom";

import classes from "./Overlay.module.css";

const Overlay = () => {
  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <Link to="/practical-guide">Close Overlay</Link>
      </div>
    </div>
  );
};

export default Overlay;
