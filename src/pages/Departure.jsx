import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import LoadedFlights from "../components/LoadedFlights";

const Departure = () => {
  const { flights } = useRouteLoaderData("flights");

  return (
    <LoadedFlights
      fallback={<p>Loading departures...</p>}
      filterTerm="departure"
      flights={flights}
    />
  );
};

export default Departure;
