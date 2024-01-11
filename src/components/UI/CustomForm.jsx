import React, { useState } from "react";
import { Form, useNavigation, Link } from "react-router-dom";

import {
  cities,
  avioCompaniesData,
  terminals,
  actions,
  time,
} from "../../data/airports";
import classes from "./CustomForm.module.css";

const CustomForm = ({ type, method, flight, errors }) => {
  const navigation = useNavigation();
  const [flightType, setFlightType] = useState("Arrival");

  const isSubmitting = navigation.state === "submitting";

  let buttonText;
  let buttonStyles;

  if (type === "submit") {
    buttonText = isSubmitting ? "Submitting..." : "Submit";
    buttonStyles = {
      backgroundColor: "blue",
    };
  }

  if (type === "edit") {
    buttonText = isSubmitting ? "Editing..." : "Edit";
    buttonStyles = {
      backgroundColor: "yellow",
      color: "black",
    };
  }

  const changeFlightTypeHandler = (event) => {
    setFlightType(event.target.value);
  };

  let defaultAirport = "Vienna";

  if (flightType === "Arrival") {
    defaultAirport = "Belgrade";
  }

  return (
    <Form className={classes.form} method={method}>
      <div className={classes.control}>
        <label htmlFor="airport">Airport</label>
        <select
          name="airport"
          id="airport"
          defaultValue={flight ? flight.airport : defaultAirport}
        >
          {cities.sort().map((item, index) => (
            <option key={index} value={item.city}>
              {item.country} - {item.city}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="flight-number">Flight Number</label>
        <input
          type="text"
          id="flight-number"
          name="flightNumber"
          defaultValue={flight ? flight.flightNumber : ""}
          style={{ borderBottom: errors ? "3px solid red" : "none" }}
        />
        {errors && errors?.message && (
          <p style={{ color: "red", letterSpacing: "1px", marginTop: "10px" }}>
            {errors?.message}
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="schedule-time">Schedule Time</label>
        <select
          name="scheduleTime"
          id="schedule-time"
          defaultValue={flight ? flight.scheduleTime : null}
        >
          {time.map((tm, index) => (
            <option key={index} value={tm}>
              {tm}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="avio-company">Avio Company</label>
        <select
          name="avioCompany"
          id="avio-company"
          defaultValue={flight ? flight.avioCompany : null}
        >
          {avioCompaniesData.map(({ avioCompany: avioCompanies, country }) => {
            return avioCompanies.map((company, index) => (
              <option key={index} value={company}>
                {company} {`(${country})`}
              </option>
            ));
          })}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="terminal">Terminal</label>
        <select
          name="terminal"
          id="terminal"
          defaultValue={flight ? flight.terminal : null}
        >
          {terminals.map((terminal, index) => (
            <option key={index} value={terminal}>
              {terminal}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          defaultValue={flight ? flight.status : "Land"}
        >
          {actions.map((action, index) => (
            <option key={index} value={action}>
              {action}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          onChange={changeFlightTypeHandler}
          value={flight ? flight.type : flightType}
        >
          <option value="arrival">Arrival</option>
          <option value="departure">Departure</option>
        </select>
      </div>
      <div className={classes.actions}>
        <Link to={`/flights?day=${new Date().toISOString().split("T")[0]}`}>
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
