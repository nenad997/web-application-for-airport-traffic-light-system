import React from "react";
import { createPortal } from "react-dom";
import { Form, Link } from "react-router-dom";

import Portal from "../UI/Portal";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const portalElement = createPortal(
    <Portal>
      <Form className={classes.form}>
        <input type="email" placeholder="Your email" name="email" />
        <button type="submit">Reset</button>
      </Form>
      <Link to="..">Back</Link>
    </Portal>,
    document.getElementById("modal")
  );

  return portalElement;
};

export default ResetPassword;
