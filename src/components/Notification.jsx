import React from "react";
import { useDispatch } from "react-redux";

// import { hideNotificationHandler } from "../store/actions/ui-actions";
import { uiActions } from "../store/slices/ui-slice";
import classes from "./Notification.module.css";

const Notification = ({ message }) => {
  const dispatch = useDispatch();

  const hideNotification = () => {
    dispatch(uiActions.hideNotification());
  };

  return (
    <div className={classes.notification}>
      <h3>{message}</h3>
      <button onClick={hideNotification}>&times;</button>
    </div>
  );
};

export default Notification;
