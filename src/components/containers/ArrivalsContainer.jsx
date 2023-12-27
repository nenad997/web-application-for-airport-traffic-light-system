import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import Flight from "../Flight";
import Container from "../UI/Container";

const ArrivalsContainer = () => {
  const data = useRouteLoaderData("flights") || [];

  return (
    <>
      <Container type="Arrival Airport" />
      {data
        .filter((item) => item.type === "arrival")
        .map((flight) => (
          <Flight
            key={flight._id}
            id={flight._id}
            departureAirport={flight.airport}
            flightNumber={flight.flightNumber}
            scheduleTime={flight.scheduleTime}
            avioCompany={flight.avioCompany}
            exitTerminal={flight.terminal}
            status={flight.status}
          />
        ))}
    </>
  );
};

export default ArrivalsContainer;
