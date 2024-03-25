import React from "react";
import { Link, Form } from "react-router-dom";

import classes from "./User.module.css";
import { getLoggedInUserId, getUserData } from "../../auth/authentication";

const User = () => {
  const userId = getLoggedInUserId();
  const userData = getUserData();

  return (
    <section className={classes.overlay}>
      <div className={classes.modal}>
        <h2>Current user: {userData.username}</h2>
        <h5>Logged in at: {userData.currentTime}</h5>
        <Form method="POST" className={classes.form}>
          <input type="hidden" name="userId" value={userId} />
          <button
            type="submit"
            title="Warning! This action deletes current user!"
          >
            Delete user
          </button>
        </Form>
        <Link to=".." className={classes.link}>
          Close
        </Link>
      </div>
    </section>
  );
};

export default User;
