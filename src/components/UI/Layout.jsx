import React from "react";

const Layout = ({ children, backgroundColor, marginTop, marginBottom }) => {
  return (
    <div style={{ backgroundColor, marginTop, marginBottom }}>{children}</div>
  );
};

export default Layout;
