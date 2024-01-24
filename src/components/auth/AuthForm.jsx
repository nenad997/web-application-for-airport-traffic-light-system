import React, { Fragment, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

import {
  isEmailValid,
  isPasswordValid,
  doPasswordsMatch,
} from "../../util/regex";
import classes from "./AuthForm.module.css";

const initialInput = {
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  employeeId: "",
};

const initialTouch = {
  email: false,
  username: false,
  password: false,
  repeatPassword: false,
  employeeId: false,
};

const AuthForm = () => {
  const [enteredValue, setEnteredValue] = useState(initialInput);
  const [isTouched, setIsTouched] = useState(initialTouch);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setEnteredValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;
    setIsTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const resetStateHandler = () => {
    setEnteredValue(initialInput);
    setIsTouched(initialTouch);
  };

  const isEmailNotValied = !isEmailValid(enteredValue.email) && isTouched.email;
  const isUserNameNotValid =
    enteredValue.username.length < 5 && isTouched.username;
  const isPasswordNotValid =
    !isPasswordValid(enteredValue.password) && isTouched.password;
  const passwordsDontMatch =
    !doPasswordsMatch(enteredValue.password, enteredValue.repeatPassword) &&
    isTouched.password &&
    isTouched.repeatPassword;
  const isEmployeeIdNotValid =
    enteredValue.employeeId.length < 5 && isTouched.employeeId;

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
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue.email}
          />
          {isEmailNotValied && (
            <p className={classes.invalid}>Invalid Email Address</p>
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
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              value={enteredValue.username}
            />
            {isUserNameNotValid && (
              <p className={classes.invalid}>Invalid User Name</p>
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
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue.password}
          />
          {mode === "signup" && passwordsDontMatch && isPasswordNotValid && (
            <p className={classes.invalid}>Password do not match</p>
          )}
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
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredValue.repeatPassword}
              />
              {passwordsDontMatch && (
                <p className={classes.invalid}>Passwords do not match</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="employee-id">Employee ID</label>
              <input
                type="text"
                placeholder="Enter your ID (from your employee card)"
                id="employee-id"
                name="employeeId"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredValue.employeeId}
              />
              {isEmployeeIdNotValid && (
                <p className={classes.invalid}>Invalid Employee ID</p>
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
          <Link
            to={`?mode=${mode === "login" ? "signup" : "login"}`}
            onClick={resetStateHandler}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
