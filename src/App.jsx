import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import FlightsLayout from "./layout/FlightsLayout";
import Home from "./pages/Home";
import Arrival from "./pages/Arrival";
import Departure from "./pages/Departure";
import NewFlight from "./pages/NewFlight";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "flights",
        element: <FlightsLayout />,
        children: [
          { index: true, element: <Arrival /> },
          { path: "departures", element: <Departure /> },
        ],
      },
      { path: "practical-guide", element: <div>Practical Guide</div> },
      { path: "services-and-sales", element: <div>Services And Sales</div> },
      {
        path: "parking-and-approach",
        element: <div>Parking And Approach</div>,
      },
      { path: "add-new-flight", element: <NewFlight /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
