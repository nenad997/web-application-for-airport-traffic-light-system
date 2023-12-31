import React from "react";
import { Form, Link } from "react-router-dom";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={classes.wrapper}>
      <Form className={classes.form} method="POST">
        <div className={classes.control}>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            placeholder="Enter your email address"
            defaultValue="nenad.matijevic97@admin.com"
            id="email"
            name="email"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
          />
        </div>
        <div className={classes.actions}>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Log In</button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
