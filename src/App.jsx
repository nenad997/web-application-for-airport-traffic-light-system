import React, { useEffect } from "react";
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
import Auth, { action as authAction, loader as authLoader } from "./pages/Auth";
import Error from "./components/UI/Error";
import { deleteFlightAction, logoutAction } from "./actions";
import { getToken } from "./authentication";

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
      { path: "delete-flight", action: deleteFlightAction },
      { path: "logout", action: logoutAction },
    ],
  },
  {
    path: "auth",
    errorElement: <Error />,
    element: <Auth />,
    action: authAction,
    loader: authLoader,
  },
]);

const App = () => {
  const token = getToken();
  const expirationTime = +localStorage.getItem("expirationTime");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token && expirationTime) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expirationTime");
      }
    }, expirationTime);

    return () => clearTimeout(timer);
  }, [token, expirationTime]);

  return <RouterProvider router={router} />;
};

export default App;
