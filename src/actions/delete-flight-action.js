import { redirect } from "react-router-dom";

export default async function deleteFlight({ request, params }) {
  const formData = await request.formData();
  const { flightId } = Object.fromEntries(formData);

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
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    throw new Error("Deletetion failed!");
  }

  return redirect("/flights");
}
