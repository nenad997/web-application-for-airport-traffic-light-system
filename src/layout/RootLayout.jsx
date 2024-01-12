import React from "react";
import { Outlet, Link, Form } from "react-router-dom";

import { getToken } from "../authentication";
import MainNavigation from "../components/MainNavigation";
import classes from "./Layout.module.css";

const RootLayout = () => {
  const token = getToken();

  let content;

  if (!token) {
    content = (
      <Link to="auth?mode=login" className={classes.login}>
        <button className={classes.button}>Log In</button>
      </Link>
    );
  }

  if (token) {
    content = (
      <Form method="POST" action="/logout">
        <button type="submit" className={`${classes.login} ${classes.button}`}>
          Logout
        </button>
      </Form>
    );
  }

  return (
    <>
      <MainNavigation />
      <Outlet />
      {content}
    </>
  );
};

export default RootLayout;
