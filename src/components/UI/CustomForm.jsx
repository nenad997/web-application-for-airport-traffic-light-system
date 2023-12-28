import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

import classes from "./CustomForm.module.css";

const CustomForm = ({ type, method }) => {
  const [flightType, setFlightType] = useState("Arrival");

  const changeTypeHandler = (event) => {
    setFlightType(event.target.value);
  };

  let buttonText;
  let buttonStyles;

  if (flightType === "Arrival") {
  }

  if (type === "submit") {
    buttonText = "Submit";
    buttonStyles = {
      backgroundColor: "blue",
    };
  }

  if (type === "edit") {
    (buttonText = "Edit"),
      (buttonStyles = {
        backgroundColor: "yellow",
        color: "black",
      });
  }

  return (
    <Form className={classes.form} method={method}>
      <div className={classes.control}>
        <label htmlFor="airport">Airport</label>
        <input type="text" id="airport" name="airport" />
      </div>
      <div className={classes.control}>
        <label htmlFor="flight-number">Flight Number</label>
        <input type="text" id="flight-number" name="flightNumber" />
      </div>
      <div className={classes.control}>
        <label htmlFor="schedule-time">Schedule Time</label>
        <input type="text" id="schedule-time" name="scheduleTime" />
      </div>
      <div className={classes.control}>
        <label htmlFor="avio-company">Avio Company</label>
        <input type="text" id="avio-company" name="avioCompany" />
      </div>
      <div className={classes.control}>
        <label htmlFor="terminal">Terminal</label>
        <input type="text" id="terminal" name="terminal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="status">Status</label>
        <select name="status" id="status">
          <option value="Land">Land</option>
          <option value="Took off">Took Off</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="type">Type</label>
        <select name="type" id="type" onChange={changeTypeHandler}>
          <option value="arrival">Arrival</option>
          <option value="departure">Departure</option>
        </select>
      </div>
      <div className={classes.actions}>
        <Link to="/flights">
          <button type="button">Cancel</button>
        </Link>
        <button type="submit" style={buttonStyles}>
          {buttonText}
        </button>
      </div>
    </Form>
  );
};

export default CustomForm;