import React from "react";
import { useParams, Form } from "react-router-dom";

import Layout from "../components/UI/Layout";
import CustomForm from "../components/UI/CustomForm";
import classes from "./Page.module.css";

const Edit = () => {
  const { flightId } = useParams();

  return (
    <Layout backgroundColor="#FFFFFF" marginTop="2rem" marginBottom={0}>
      <CustomForm type="edit" />
      <Form method="POST" action="/delete-flight">
        <div className={classes["btn-container"]}>
          <input type="hidden" name="flightId" value={flightId} />
          <button type="submit">Delete Flight</button>
        </div>
      </Form>
    </Layout>
  );
};

export default Edit;
