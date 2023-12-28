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
      <div className={classes["btn-container"]}>
        <Form method="POST" action="/delete-flight">
          <input type="hidden" name="flightId" value={flightId} onChange={undefined} />
          <button>Delete Flight</button>
        </Form>
      </div>
    </Layout>
  );
};

export default Edit;
