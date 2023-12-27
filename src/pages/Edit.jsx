import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/UI/Layout";
import CustomForm from "../components/UI/CustomForm";
import classes from "./Page.module.css";

const Edit = () => {
  const { flightId } = useParams();

  const deleteFlightHandler = () => {
    console.log(`Deleted flight with an id of ${flightId}`);
  };

  return (
    <Layout backgroundColor="#FFFFFF" marginTop="2rem" marginBottom={0}>
      <CustomForm type="edit" />
      <div className={classes["btn-container"]}>
        <button onClick={deleteFlightHandler}>Delete Flight</button>
      </div>
    </Layout>
  );
};

export default Edit;
