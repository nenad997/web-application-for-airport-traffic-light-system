import React, { Fragment } from "react";
import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

import Input from "../UI/Input";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const mode = searchParams.get("mode") || "signup";

  let formClasses = classes.form;

  if (actionData?.data?.length > 0) {
    formClasses = `${classes.form} ${classes["invalid-form"]}`;
  }

  return (
    <div className={classes.wrapper}>
      <Form className={formClasses} method="POST">
        <div className={classes.control}>
          <Input
            label="Email address"
            type="text"
            placeholder="Enter email address"
            id="email"
            name="email"
          />
          {actionData?.data && (
            <p className={classes.invalid}>
              {actionData?.data?.find((err) => err.path === "email")?.message}
            </p>
          )}
        </div>
        {mode === "signup" && (
          <div className={classes.control}>
            <Input
              label="User name"
              type="text"
              placeholder="Enter username"
              id="username"
              name="username"
            />
            {mode === "signup" && actionData?.data && (
              <p className={classes.invalid}>
                {
                  actionData?.data?.find(
                    (err) => err.path === "username" && err.mode === "signup"
                  )?.message
                }
              </p>
            )}
          </div>
        )}
        <div className={classes.control}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
          />
          {mode === "login" && actionData?.data && (
            <p className={classes.invalid}>
              {
                actionData?.data.find(
                  (err) => err.path === "password" && err.mode === "login"
                )?.message
              }
            </p>
          )}
          {mode === "signup" &&
            actionData?.data &&
            actionData?.data
              .filter((err) => err.path === "password" && err.mode === "signup")
              .map((err, index) => (
                <p className={classes.invalid} key={index}>
                  {err.message}
                </p>
              ))}
        </div>
        {mode === "signup" && (
          <Fragment>
            <div className={classes.control}>
              <Input
                label="Repeat password"
                type="password"
                placeholder="Repeat password"
                id="repeat-password"
                name="repeatPassword"
              />
              {mode === "signup" &&
                actionData?.data &&
                actionData?.data
                  .filter(
                    (err) => err.path === "password" && err.mode === "signup"
                  )
                  .map((err, index) => (
                    <p className={classes.invalid} key={index}>
                      {err.message}
                    </p>
                  ))}
            </div>
            <div className={classes.control}>
              <Input
                label="Employee ID"
                type="text"
                placeholder="Enter your ID (from your employee card)"
                id="employee-id"
                name="employeeId"
              />
              {mode === "signup" && actionData?.data && (
                <p className={classes.invalid}>
                  {
                    actionData?.data.find(
                      (err) =>
                        err.path === "employeeId" && err.mode === "signup"
                    )?.message
                  }
                </p>
              )}
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
