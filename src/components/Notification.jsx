import React from "react";

import classes from "./Notification.module.css";

const Notification = ({ message, color, onHideNotification }) => {
  return (
    <div className={classes.notification}>
      <h3 style={{ color }}>{message}</h3>
      <button onClick={onHideNotification}>&times;</button>
    </div>
  );
};

export default Notification;
