import React from "react";
import { redirect, json } from "react-router-dom";

import { getToken } from "../authentication";
import AuthForm from "../components/auth/AuthForm";

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export async function action({ request, params }) {
  const formData = await request.formData();
  const { email, username, password, repeatPassword, employeeId, mode } =
    Object.fromEntries(formData);

  const errors = [];

  let graphqlQuery;

  switch (mode) {
    case "login": {
      if (!email)
        errors.push({
          message: "Please enter your email address",
          path: "email",
          mode: "login",
        });
      if (!password)
        errors.push({
          message: "Please enter your password",
          path: "password",
          mode: "login",
        });
      graphqlQuery = {
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
      break;
    }
    case "signup": {
      const invalidText = "Please fill out this field";
      if (!email) {
        errors.push({
          message: invalidText,
          path: "email",
          mode: "signup",
        });
      }
      if (!username) {
        errors.push({
          message: invalidText,
          path: "username",
          mode: "signup",
        });
      }
      if (!password) {
        errors.push({
          message: invalidText,
          path: "password",
          mode: "signup",
        });
      }
      if (password.length < 6 || password.length > 15) {
        errors.push({
          message: "Password must be between 6 and 15 characters long",
          path: "password",
          mode: "signup",
        });
      }
      if (password.toString() !== repeatPassword.toString()) {
        errors.push({
          message: "Passwords do not match",
          path: "password",
          mode: "signup",
        });
      }
      if (!employeeId) {
        errors.push({
          message: invalidText,
          path: "employeeId",
          mode: "signup",
        });
      }
      if (employeeId.toString() !== "ABC123") {
        errors.push({
          message: `Could not find an employee with this ID ${
            employeeId.toString() !== "" ? `(${employeeId.toString()})` : ""
          }`,
          path: "employeeId",
          mode: "signup",
        });
      }
      graphqlQuery = {
        query: `
          mutation {
            signUp(input: {
              email: "${email}",
              username: "${username}",
              password: "${password}",
              repeatPassword: "${repeatPassword}",
              employeeId: "${employeeId}"
            }) {
              _id
            }
          }
        `,
      };
      break;
    }
    default: {
      throw new Error("Invalid mode!");
    }
  }

  if (errors.length > 0) {
    return json({ data: errors }, { status: 400 });
  }

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  if (!response.ok) {
    const passwordErrorIndex = errors.findIndex(
      (err) => err.path === "password" && err.mode === "login"
    );
    const passwordError = errors[passwordErrorIndex];
    let newError;
    if (passwordErrorIndex >= 0) {
      newError = { ...passwordError, message: "Incorrect password" };
      errors[passwordErrorIndex] = newError;
    } else {
      newError = {
        message: "Incorrect password",
        path: "password",
        mode: "login",
      };
      errors.push(newError);
    }
    return json({ data: errors }, { status: 401 });
  }

  const responseData = await response.json();

  let pathName;

  switch (mode) {
    case "login": {
      const { token } = responseData.data.login;
      localStorage.setItem("authToken", token);
      const expirationTime = 5 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
      pathName = "/";
      break;
    }
    case "signup": {
      // const { _id } = responseData.data.signUp;
      pathName = "/auth?mode=login";
      break;
    }
    default: {
      throw new Error("Invalid mode!");
    }
  }
  return redirect(pathName);
}

export async function loader({ request, params }) {
  const token = getToken();

  const queryParams = request.url.split("?")[1].split("&");

  const mode = queryParams?.find((qp) => qp.startsWith("mode="))?.split("=")[1];

  if (mode !== "login" && mode !== "signup") {
    return redirect("/auth?mode=login");
  }

  if (token) {
    return redirect("/");
  }
  return null;
}
