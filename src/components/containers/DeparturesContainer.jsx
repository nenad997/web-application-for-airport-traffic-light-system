import React from "react";

import Container from "../UI/Container";
import Flight from "../Flight";

const DeparturesContainer = () => {
  return (
    <>
      <Container type="Destination Airport" />
      <Flight
        id="f232323"
        departureAirport="Nikola Tesla"
        flightNumber="JU 886"
        scheduleTime="00:05"
        avioCompany="Air Serbia"
        exitTerminal="A02"
        status="Took off"
      />
      <Flight
        id="fmnesekfm454"
        departureAirport="LAX"
        flightNumber="JU 886"
        scheduleTime="00:05"
        avioCompany="Air Serbia"
        exitTerminal="A02"
        status="Took off"
      />
    </>
  );
};

export default DeparturesContainer;
