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
  isFieldNotValid,
  invalidClassName,
  invalidMessage,
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
      />
      {isFieldNotValid && <p className={invalidClassName}>{invalidMessage}</p>}
    </>
  );
};

export default Input;
