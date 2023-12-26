import React from "react";
import { Outlet } from "react-router-dom";

import FlightsNavigation from "../components/FlightsNavigation";

const FlightsLayout = () => {
  return (
    <>
      <FlightsNavigation />
      <Outlet />
    </>
  );
};

export default FlightsLayout;
