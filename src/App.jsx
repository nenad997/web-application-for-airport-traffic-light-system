import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import FlightsLayout from "./layout/FlightsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <div>Home</div> },
      {
        path: "flights",
        element: <FlightsLayout />,
        children: [
          { index: true, element: <div>Arrivals</div> },
          { path: "departures", element: <div>Departures</div> },
        ],
      },
      { path: "practical-guide", element: <div>Practical Guide</div> },
      { path: "services-and-sales", element: <div>Services And Sales</div> },
      {
        path: "parking-and-approach",
        element: <div>Parking And Approach</div>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
