import React, { Fragment, useReducer, useEffect } from "react";
import { redirect, json, useActionData } from "react-router-dom";

import { getToken } from "../authentication";
import Notification from "../components/Notification";
import AuthForm from "../components/auth/AuthForm";

const initialState = {
  isNotificationVisible: true,
  errors: null,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "hideNotification": {
      return initialState;
    }
    case "showNotification": {
      return {
        ...state,
        errors: action.payload,
      };
    }
    default: {
      throw new Error("An Error Occurred!");
    }
  }
}

const Auth = () => {
  const actionData = useActionData();
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const hideNotificationHandler = () => {
    dispatch({ type: "hideNotification" });
  };

  useEffect(() => {
    dispatch({ type: "showNotification", payload: actionData });
  }, [actionData]);

  return (
    <Fragment>
      {state.errors?.message && state.isNotificationVisible && (
        <Notification
          message={state.errors?.message}
          color={state.errors?.color}
          onHideNotification={hideNotificationHandler}
        />
      )}
      <AuthForm />
    </Fragment>
  );
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
          message: `${invalidText}, your password must should contain letters and numbers only`,
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
    const passwordErrorIndex = errors?.findIndex(
      (err) => err.path === "password" && err.mode === "login"
    );
    const passwordError = errors[passwordErrorIndex];
    let newError;
    if (passwordError) {
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
    throw json({ data: errors }, { status: 401 });
  }

  const responseData = await response.json();

  let pathName;

  try {
    switch (mode) {
      case "login": {
        const token = responseData?.data?.login?.token;
        if (token) {
          localStorage.setItem("authToken", token);
          const expirationTime = 5 * 60 * 60 * 1000;
          localStorage.setItem("expirationTime", expirationTime);
          pathName = "/";
        } else {
          redirect(request.url);
          return json(
            { message: "Invalid password or email address!", color: "red" },
            { status: 401 }
          );
        }
        break;
      }
      case "signup": {
        const id = responseData?.data?.signUp?._id;
        if (id) {
          pathName = "/auth?mode=login";
        } else {
          redirect(request.url);
          return json(
            {
              message:
                "User with this email already exists, please pick another email address!",
              color: "red",
            },
            { status: 401 }
          );
        }
        break;
      }
      default: {
        throw new Error("Invalid mode!");
      }
    }
    return redirect(pathName);
  } catch (error) {
    return json(
      {
        message: error.message,
        color: "red",
      },
      { status: 500 }
    );
  }
}

export async function loader({ request, params }) {
  const token = getToken();

  const queryParams = request.url.split("?")[1].split("&");

  const mode =
    queryParams?.find((qp) => qp.startsWith("mode="))?.split("=")[1] ||
    "signup";

  if (mode !== "login" && mode !== "signup") {
    return redirect("/auth?mode=login");
  }

  if (token) {
    return redirect("/");
  }
  return null;
}
