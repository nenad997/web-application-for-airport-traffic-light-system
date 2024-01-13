import React, { Fragment } from "react";
import { Form, Link, useActionData, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();

  const mode = searchParams.get("mode") || "signup";

  return (
    <div className={classes.wrapper}>
      <Form className={classes.form} method="POST">
        <div className={classes.control}>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            name="email"
            style={{
              borderBottom: actionData?.data.find((d) => d.path === "email")
                ? "3px solid red"
                : "none",
            }}
          />
          {actionData && actionData?.data && (
            <p className={classes.invalid}>
              {actionData?.data.find((d) => d.path === "email")?.message}
            </p>
          )}
        </div>
        {mode === "signup" && (
          <div className={classes.control}>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              placeholder="Enter username"
              id="username"
              name="username"
              style={{
                borderBottom: actionData?.data.find(
                  (d) => d.path === "email" && d.mode === "signup"
                )
                  ? "3px solid red"
                  : "none",
              }}
            />
            {actionData && actionData?.data && (
              <p className={classes.invalid}>
                {
                  actionData?.data.find(
                    (d) => d.path === "email" && d.mode === "signup"
                  )?.message
                }
              </p>
            )}
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            style={{
              borderBottom: actionData?.data.find((d) => d.path === "password")
                ? "3px solid red"
                : "none",
            }}
          />
          {mode === "login" && actionData && actionData?.data && (
            <p className={classes.invalid}>
              {actionData?.data.find((d) => d.path === "password")?.message}
            </p>
          )}
          {mode === "signup" &&
            actionData &&
            actionData?.data &&
            actionData?.data
              .filter((d) => d.path === "password" && d.mode === "signup")
              .map((err, index) => (
                <p key={index} className={classes.invalid}>
                  {err.message}
                </p>
              ))}
        </div>
        {mode === "signup" && (
          <Fragment>
            <div className={classes.control}>
              <label htmlFor="repeat-password">Repeat password</label>
              <input
                type="password"
                placeholder="Repeat password"
                id="repeat-password"
                name="repeatPassword"
                style={{
                  borderBottom: actionData?.data.find(
                    (d) => d.path === "password"
                  )
                    ? "3px solid red"
                    : "none",
                }}
              />
              {mode === "login" && actionData && actionData?.data && (
                <p className={classes.invalid}>
                  {actionData?.data.find((d) => d.path === "password")?.message}
                </p>
              )}
              {mode === "signup" &&
                actionData &&
                actionData?.data &&
                actionData?.data
                  .filter((d) => d.path === "password" && d.mode === "signup")
                  .map((err, index) => (
                    <p key={index} className={classes.invalid}>
                      {err.message}
                    </p>
                  ))}
            </div>
            <div className={classes.control}>
              <label htmlFor="employee-id">Employee ID</label>
              <input
                type="text"
                placeholder="Enter your ID (from your employee card)"
                id="employee-id"
                name="employeeId"
                style={{
                  borderBottom: actionData?.data.find(
                    (d) => d.path === "employeeId" && d.mode === "signup"
                  )
                    ? "3px solid red"
                    : "none",
                }}
              />
              {actionData &&
                actionData?.data &&
                actionData?.data
                  .filter((d) => d.path === "employeeId" && d.mode === "signup")
                  .map((err, index) => (
                    <p key={index} className={classes.invalid}>
                      {err.message}
                    </p>
                  ))}
            </div>
          </Fragment>
        )}
        <input type="hidden" name="mode" value={mode} />
        <div className={classes.actions}>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </div>
        <div className={classes.reset}>
          <Link to={`?mode=${mode === "login" ? "signup" : "login"}`}>
            {mode === "login" ? "Sign Up" : "Login"}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
