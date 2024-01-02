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
import PracticalGuide from "./pages/PracticalGuide";
import PracticalGuideModal from "./pages/PracticalGuideModal";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login";
import { deleteFlightAction, logoutAction } from "./actions";

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
          {
            path: ":flightId",
            element: <Edit />,
            loader: flightLoader,
            action: editFlightAction,
          },
        ],
      },
      {
        path: "practical-guide",
        children: [
          { index: true, element: <PracticalGuide /> },
          { path: "modal", element: <PracticalGuideModal /> },
        ],
      },
      // {
      //   path: "practical-guide",
      //   element: <div>Practical Guide</div>,
      //   children: [
      //     { path: "modal", element: <div>Practical guide modal</div> },
      //   ],
      // },
      { path: "services-and-sales", element: <div>Services And Sales</div> },
      {
        path: "parking-and-approach",
        element: <div>Parking And Approach</div>,
      },
      {
        path: "add-new-flight",
        element: <NewFlight />,
        action: addFlightAction,
        loader: newFlightLoader,
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
