import React from "react";
import { Link, Form } from "react-router-dom";

import classes from "./User.module.css";
import { getLoggedInUserId } from "../../auth/authentication";

const User = () => {
  const userId = getLoggedInUserId();

  return (
    <div className={classes.profile}>
      <section>
        <h2>Loggedin user</h2>
        <h5>Active since</h5>
        <Form method="POST">
          <input type="hidden" name="userId" value={userId} />
          <button type="submit">Delete user</button>
        </Form>
        <Link to="..">Close</Link>
      </section>
    </div>
  );
};

export default User;
