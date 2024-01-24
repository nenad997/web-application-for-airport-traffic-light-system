import React, { Fragment, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

import {
  isEmailValid,
  isPasswordValid,
  doPasswordsMatch,
} from "../../util/regex";
import Input from "../UI/Input";
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
          <Input
            label="Email address"
            type="text"
            placeholder="Enter email address"
            id="email"
            name="email"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue.email}
            isFieldNotValid={isEmailNotValied}
            invalidClassName={classes.invalid}
            invalidMessage="Invalid Email Address"
          />
        </div>
        {mode === "signup" && (
          <div className={classes.control}>
            <Input
              label="User name"
              type="text"
              placeholder="Enter username"
              id="username"
              name="username"
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              value={enteredValue.username}
              isFieldNotValid={isUserNameNotValid}
              invalidClassName={classes.invalid}
              invalidMessage="Invalid User Name"
            />
          </div>
        )}
        <div className={classes.control}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue.password}
            isFieldNotValid={
              mode === "signup" && passwordsDontMatch && isPasswordNotValid
            }
            invalidClassName={classes.invalid}
            invalidMessage="Passwords do not match"
          />
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
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredValue.repeatPassword}
                isFieldNotValid={passwordsDontMatch}
                invalidClassName={classes.invalid}
                invalidMessage="Passwords do not match"
              />
            </div>
            <div className={classes.control}>
              <Input
                label="Employee ID"
                type="text"
                placeholder="Enter your ID (from your employee card)"
                id="employee-id"
                name="employeeId"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredValue.employeeId}
                isFieldNotValid={isEmployeeIdNotValid}
                invalidClassName={classes.invalid}
                invalidMessage="Invalid Employee ID"
              />
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
