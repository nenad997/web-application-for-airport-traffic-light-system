import React from "react";
import { Form } from "react-router-dom";

import classes from "./DeleteForm.module.css";

const DeleteForm = ({ value, name, text, action }) => {
  return (
    <Form method="POST" action={action}>
      <div className={classes["btn-container"]}>
        <input type="hidden" name={name} value={value} />
        <button type="submit">{text}</button>
      </div>
    </Form>
  );
};

export default DeleteForm;
