import React, { useContext } from "react";
import { Form } from "react-router-dom";
import DOMPurify from "dompurify";

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
        <h2>
          Current user: <span>{userData.username}</span>
        </h2>
        <h5>
          Logged in at: <span>{userData.currentTime}</span>
        </h5>
        <Form method="POST" action="/delete-profile" className={classes.form}>
          <input
            type="hidden"
            name="userId"
            value={DOMPurify.sanitize(userId)}
          />
          <button
            type="submit"
            title="Warning! This action deletes current loggedin user, no data can be retrieved!"
          >
            Delete user
          </button>
        </Form>
        <button
          className={classes.close}
          onClick={hideProfilePortal}
          title="Close"
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default User;
