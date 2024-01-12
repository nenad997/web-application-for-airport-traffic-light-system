import { redirect, json } from "react-router-dom";

import { getToken } from "./authentication";

export async function deleteFlightAction({ request, params }) {
  const formData = await request.formData();
  const { flightId } = Object.fromEntries(formData);

  const token = getToken();

  if (!token) {
    return redirect("/login");
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
  }

  return redirect("/login");
}
