import { redirect } from "react-router-dom";

import { getToken } from "./authentication";

export async function deleteFlightAction({ request, params }) {
  const formData = await request.formData();
  const { flightId } = Object.fromEntries(formData);

  const token = getToken();

  if (!window.confirm("Are you sure?")) {
    return redirect(`/flights/${flightId}`);
  }

  const graphqlQuery = {
    query: `
        mutation {
          deleteFlight(flightId: "${flightId.toString()}") {
            _id
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
    // return json({ message: "Deletion failed!" }, { status: 422 });
    return redirect(`/flights/${flightId}`);
  }

  return redirect("/flights");
}

export async function logoutAction() {
  const token = getToken();

  if (token) {
    localStorage.removeItem("authToken");
  }

  return redirect("/login");
}
