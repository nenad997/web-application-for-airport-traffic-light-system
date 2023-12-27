import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import Container from "../UI/Container";
import Flight from "../Flight";

const DeparturesContainer = () => {
  const data = useRouteLoaderData("flights") || [];

  return (
    <>
      <Container type="Destination Airport" />
      {data
        .filter((item) => item.type === "departure")
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

export default DeparturesContainer;
