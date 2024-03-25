import React, { useContext } from "react";
import { Form } from "react-router-dom";

import classes from "./User.module.css";
import { getLoggedInUserId, getUserData } from "../../auth/authentication";
import { AppContext } from "../../store/AppContext";

const User = () => {
  const { hideProfilePortal } = useContext(AppContext);

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
        <button className={classes.link} onClick={hideProfilePortal}>
          Close
        </button>
      </div>
    </section>
  );
};

export default User;
