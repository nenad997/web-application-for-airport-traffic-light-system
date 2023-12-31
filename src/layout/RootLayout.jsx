import React from "react";
import { Outlet, Link } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import classes from "./Layout.module.css";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Link to="/login" className={classes.login}>
        <button>Log In</button>
      </Link>
    </>
  );
};

export default RootLayout;
