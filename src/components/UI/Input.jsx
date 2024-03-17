import React from "react";

const Input = ({ label, inputConfig, isInvalid }) => {
  return (
    <>
      <label htmlFor={inputConfig.id}>{label}</label>
      <input
        {...inputConfig}
        style={{ borderBottom: isInvalid ? "3px solid red" : undefined }}
      />
    </>
  );
};

export default Input;
