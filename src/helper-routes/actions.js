import { redirect, json } from "react-router-dom";

import { getToken } from "../auth/authentication";

export async function deleteFlightAction({ request, params }) {
  const formData = await request.formData();
  const { flightId } = Object.fromEntries(formData);

  const token = getToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  if (!window.confirm("Are you sure?")) {
    return redirect(`/flights/${flightId}`);
  }

  const graphqlQuery = {
    query: `
        mutation {
          deleteFlight(flightId: "${flightId.toString()}") {
            _id
            createdAt
            type
          }
        }
      `,
  };

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    return json({ message: "Failed to delete flight" }, { status: 404 });
  }

  await response.json();

  return redirect(`/flights?day=${new Date().toISOString().split("T")[0]}`);
}

export async function logoutAction() {
  const token = getToken();

  if (token) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("currentTime");
  }

  return redirect("/auth?mode=login");
}

export async function profileAction({ request }) {
  const formData = await request.formData();
  const { userId } = Object.fromEntries(formData);

  if (!window.confirm("Are you sure?")) {
    console.log(request);
    return redirect(request.url);
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

  await response.json();

  if (!response.ok) {
    return json({ message: "Failed to delete user" }, { status: 500 });
  }

  return redirect("/");
}
