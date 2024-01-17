import React, { Suspense } from "react";
import { useSearchParams, Await } from "react-router-dom";

import Flight from "./Flight";
import { getHumanReadableDate } from "../util/dates";

const LoadedFlights = ({ flights, fallback, filterTerm }) => {
  const [searchParams] = useSearchParams();

  const dateQueryParam = searchParams.get("day");

  const humanReadableDate = getHumanReadableDate(dateQueryParam);

  return (
    <Suspense fallback={fallback}>
      <Await resolve={flights}>
        {(loadedFlights) => {
          const filteredFlights = loadedFlights.filter(
            dateQueryParam?.startsWith("2") && dateQueryParam !== "all"
              ? (item) =>
                  item.createdAt.split("T")[0] === dateQueryParam &&
                  item.type === filterTerm
              : (item) => item.type === filterTerm
          );

          return filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <Flight key={flight._id} {...flight} />
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

export default LoadedFlights;
