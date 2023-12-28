import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import FlightsLayout, { loader as flightsLoader } from "./layout/FlightsLayout";
import Home from "./pages/Home";
import Arrival from "./pages/Arrival";
import Departure from "./pages/Departure";
import NewFlight, { action as addFlightAction } from "./pages/NewFlight";
import Edit from "./pages/Edit";
import deleteFlightAction from "./actions/delete-flight-action";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "flights",
        id: "flights",
        element: <FlightsLayout />,
        loader: flightsLoader,
        children: [
          { index: true, element: <Arrival /> },
          { path: "departures", element: <Departure /> },
          { path: ":flightId", element: <Edit /> },
        ],
      },
      { path: "practical-guide", element: <div>Practical Guide</div> },
      { path: "services-and-sales", element: <div>Services And Sales</div> },
      {
        path: "parking-and-approach",
        element: <div>Parking And Approach</div>,
      },
      {
        path: "add-new-flight",
        element: <NewFlight />,
        action: addFlightAction,
      },
      { path: "/delete-flight", action: deleteFlightAction },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
