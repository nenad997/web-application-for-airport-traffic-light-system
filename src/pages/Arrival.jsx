import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import LoadedFlights from "../components/LoadedFlights";

const Arrival = () => {
  const { flights } = useRouteLoaderData("flights");

  return (
    <LoadedFlights
      fallback={<p className="center">Loading arrivals...</p>}
      filterTerm="arrival"
      flights={flights}
    />
  );
};

export default Arrival;
