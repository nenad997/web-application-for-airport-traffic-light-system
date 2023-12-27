import React from "react";
import { useParams, Form } from "react-router-dom";

import CustomForm from "../components/UI/CustomForm";

const Edit = () => {
  const { flightId } = useParams();

  const deleteFlightHandler = () => {
    console.log(`Deleted flight with an id of ${flightId}`);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <CustomForm type="edit" />
      <div
        style={{
          textAlign: "center",
          maxWidth: "15%",
          margin: "auto",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      >
        <button
          style={{
            width: "100%",
            padding: "10px 15px",
            border: "none",
            outline: "none",
            fontSize: "25px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "red",
            color: "white",
          }}
          onClick={deleteFlightHandler}
        >
          Delete Flight
        </button>
      </div>
    </div>
  );
};

export default Edit;
