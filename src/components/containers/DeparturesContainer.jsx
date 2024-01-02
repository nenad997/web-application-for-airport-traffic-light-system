import React, { Suspense } from "react";
import { useRouteLoaderData, Await } from "react-router-dom";

import Container from "../UI/Container";
import Flight from "../Flight";

const DeparturesContainer = () => {
  const { flights } = useRouteLoaderData("flights") || [];

  return (
    <>
      <Container type="Destination Airport" />
      <Suspense fallback={<p>Loading flights...</p>}>
        <Await resolve={flights}>
          {(loadedFlights) =>
            loadedFlights
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
              ))
          }
        </Await>
      </Suspense>
    </>
  );
};

export default DeparturesContainer;
