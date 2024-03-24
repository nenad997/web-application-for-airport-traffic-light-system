import React from "react";
import { Outlet, Link, Form } from "react-router-dom";

import { getToken } from "../auth/authentication";
import MainNavigation from "../components/navigation/MainNavigation";
import AuthIcon from "../components/UI/AuthIcon";
import classes from "./Layout.module.css";

const RootLayout = () => {
  const token = getToken();

  let content;

  if (!token) {
    content = (
      <Link
        to="auth?mode=login"
        className={classes.login}
        title="Login or signup"
      >
        <button className={classes.button}>
          <AuthIcon mode="login" />
        </button>
      </Link>
    );
  }

  if (token) {
    content = (
      <React.Fragment>
        <Form method="POST" action="/logout">
          <button
            type="submit"
            className={`${classes.login} ${classes.button}`}
            title="Logout"
          >
            <AuthIcon mode="logout" />
          </button>
        </Form>
      </React.Fragment>
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
