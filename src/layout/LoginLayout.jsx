import React from "react";
import { Outlet } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

const LoginLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
      <LoginForm />
    </React.Fragment>
  );
};

export default LoginLayout;
