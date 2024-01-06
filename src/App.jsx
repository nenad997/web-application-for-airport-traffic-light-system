import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import FlightsLayout, { loader as flightsLoader } from "./layout/FlightsLayout";
import Home from "./pages/Home";
import Arrival from "./pages/Arrival";
import Departure from "./pages/Departure";
import NewFlight, {
  action as addFlightAction,
  loader as newFlightLoader,
} from "./pages/NewFlight";
import Edit, {
  loader as flightLoader,
  action as editFlightAction,
} from "./pages/Edit";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login";
import Error from "./components/UI/Error";
import { deleteFlightAction, logoutAction } from "./actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
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
          {
            path: ":flightId",
            element: <Edit />,
            loader: flightLoader,
            action: editFlightAction,
          },
          {
            path: "add-new-flight",
            element: <NewFlight />,
            action: addFlightAction,
            loader: newFlightLoader,
          },
        ],
      },
      { path: "practical-guide", element: <div>Practical Guide</div> },
      {
        path: "parking-and-approach",
        element: <div>Parking And Approach</div>,
      },
      { path: "delete-flight", action: deleteFlightAction },
      { path: "logout", action: logoutAction },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
