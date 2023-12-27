import React from "react";

import Flight from "../Flight";
import Container from "../UI/Container";

const ArrivalsContainer = () => {
  return (
    <>
      <Container type="Departure Airport" />
      <Flight
        id="f1"
        departureAirport="Larnaca"
        flightNumber="JU 886"
        scheduleTime="00:05"
        avioCompany="Air Serbia"
        exitTerminal="A02"
        status="Took off"
      />
    </>
  );
};

export default ArrivalsContainer;
