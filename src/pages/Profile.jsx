import React from "react";
import { createPortal } from "react-dom";
import { json, redirect } from "react-router-dom";

import User from "../components/auth/User";
import { getLoggedInUserId } from "../auth/authentication";

const Profile = () => {
  const portal = createPortal(<User />, document.getElementById("modal"));

  return portal;
};

export default Profile;

export async function loader() {
  const loggedInUserId = getLoggedInUserId();

  if (!loggedInUserId) {
    return redirect("/auth?mode=login");
  }
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const { userId } = Object.fromEntries(formData);

  if (!window.confirm("Are you sure?")) {
    return redirect(request.url);
  }

  const itemsToRemove = [
    "authToken",
    "userId",
    "expirationTime",
    "username",
    "currentTime",
  ];

  for (const key of itemsToRemove) {
    localStorage.removeItem(key);
  }

  const graphqlQuery = {
    query: `
        mutation {
          deleteUser(userId: "${userId.toString()}") {
            _id
          }
        }
    `,
  };

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return json({ message: "Failed to delete user" }, { status: 500 });
  }

  return redirect("/auth?mode=signup");
}
