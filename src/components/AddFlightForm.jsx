import React from "react";
import { Link, Form } from "react-router-dom";

import classes from "./AddFlightForm.module.css";

const AddFlightForm = () => {
  return (
    <div className={classes.wrapper}>
      <Form className={classes.form}>
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
          <label htmlFor="exit-terminal">Exit Terminal</label>
          <input type="text" id="exit-terminal" name="exitTerminal" />
        </div>
        <div className={classes.control}>
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" />
        </div>
        <div className={classes.control}>
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="arrival">Arrival</option>
            <option value="departure">Departure</option>
          </select>
        </div>
        <div className={classes.actions}>
          <Link to="/flights">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default AddFlightForm;
