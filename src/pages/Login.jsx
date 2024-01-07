import React from "react";
import { redirect, json } from "react-router-dom";

import { getToken } from "../authentication";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return <LoginForm />;
};

export default Login;

export async function action({ request, params }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  const graphqlQuery = {
    query: `
      {
        login(input: { email: "${email}", password: "${password}" }) {
          _id
          username
          token
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
    return response;
  }

  const responseData = await response.json();

  const { _id, username, token } = responseData.data.login;

  localStorage.setItem("authToken", token);

  const expirationTime = 5 * 60 * 60 * 1000;

  localStorage.setItem("expirationTime", expirationTime);

  return redirect("/");
}

export async function loader() {
  const token = getToken();

  if (token) {
    return redirect("/");
  }
  return null;
}
