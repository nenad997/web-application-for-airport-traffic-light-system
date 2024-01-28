import React from "react";

const Input = ({
  label,
  id,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  isInvalid,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{ borderBottom: isInvalid ? "3px solid red" : undefined }}
      />
    </>
  );
};

export default Input;
