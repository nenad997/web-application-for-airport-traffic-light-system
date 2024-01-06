import React, { Suspense } from "react";
import { useRouteLoaderData, Await, useLocation } from "react-router-dom";

import Flight from "../Flight";
import Container from "../UI/Container";

const ArrivalsContainer = () => {
  const { search } = useLocation();
  const { flights } = useRouteLoaderData("flights") || [];

  const dateQueryParam = search.split("=")[1].split("T")[0];

  return (
    <>
      <Container type="Arrival Airport" />
      <Suspense fallback={<p>Loading flights...</p>}>
        <Await resolve={flights}>
          {(loadedFlights) =>
            loadedFlights
              .filter(
                dateQueryParam.startsWith("2") &&
                  dateQueryParam.toString() !== "true"
                  ? (item) =>
                      item.createdAt.split("T")[0].toString() ===
                        dateQueryParam.toString() && item.type === "arrival"
                  : (item) => item.type === "arrival"
              )
              .map((flight) => (
                <Flight
                  key={flight._id}
                  id={flight._id}
                  departureAirport={flight.airport}
                  flightNumber={flight.flightNumber}
                  scheduleTime={flight.scheduleTime}
                  avioCompany={flight.avioCompany}
                  exitTerminal={flight.terminal}
                  scheduleDate={flight.createdAt}
                  status={flight.status}
                />
              ))
          }
        </Await>
      </Suspense>
    </>
  );
};

export default ArrivalsContainer;
