import React from "react";
import { Link } from "react-router-dom";

import Container from "./UI/Container";
import Flight from "./Flight";
import classes from "./AllFlights.module.css";

const AllFlights = ({ loadedFlights, idFilter, filterTerm }) => {
  const filteredFlights = loadedFlights.filter((flight) => {
    return flight._id !== idFilter && flight.type === filterTerm;
  });

  return filteredFlights.length > 0 ? (
    <div className={classes.container}>
      <h1>
        All{" "}
        {filterTerm === "arrival"
          ? "Arrivals"
          : filterTerm === "departure"
          ? "Departures"
          : ""}
      </h1>
      <div>
        <Container
          type={
            filterTerm === "arrival"
              ? "Arrival"
              : filterTerm === "departure"
              ? "Departure"
              : ""
          }
        />
        {filteredFlights.map((flight) => (
          <Flight key={flight._id} {...flight} shouldPageRefresh={true} />
        ))}
      </div>
      <p className={classes.link}>
        <Link to="/flights/add-new-flight" title="Add a New Flight">
          New Flight
        </Link>
      </p>
    </div>
  ) : (
    <h1 className="center">No Flights Available</h1>
  );
};

export default AllFlights;
