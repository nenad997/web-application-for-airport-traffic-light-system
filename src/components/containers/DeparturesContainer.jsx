import React, { Suspense } from "react";
import { useRouteLoaderData, Await, useSearchParams } from "react-router-dom";

import Flight from "../Flight";
import { getHumanReadableDate } from "../../util/dates";

const DeparturesContainer = () => {
  const [searchParams] = useSearchParams();
  const { flights } = useRouteLoaderData("flights") || [];

  const dateQueryParam = searchParams.get("day");

  const humanReadableDate = getHumanReadableDate(dateQueryParam);

  return (
    <Suspense fallback={<p>Loading flights...</p>}>
      <Await resolve={flights}>
        {(loadedFlights) => {
          const filteredFlights = loadedFlights.filter(
            dateQueryParam.startsWith("2") &&
              dateQueryParam.toString() !== "all"
              ? (item) =>
                  item.createdAt.split("T")[0].toString() ===
                    dateQueryParam.toString() && item.type === "departure"
              : (item) => item.type === "departure"
          );

          return filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
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
          ) : (
            <h1 style={{ textAlign: "center" }}>
              No data for {humanReadableDate}
            </h1>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default DeparturesContainer;
