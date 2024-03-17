import React from "react";
import { CiLogin, CiLogout } from "react-icons/ci";

const AuthIcon = ({ mode }) => {
  const style = { fontSize: "25px", borderRadius: "50%", color: "white" };

  switch (mode) {
    case "login": {
      return <CiLogin style={style} />;
    }
    case "logout": {
      return <CiLogout style={style} />;
    }
    default: {
      return <p className="center">Invalid mode provided!</p>;
    }
  }
};

export default AuthIcon;
