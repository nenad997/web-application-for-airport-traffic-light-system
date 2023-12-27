import React from "react";

import Layout from "./UI/Layout";
import CustomForm from "./UI/CustomForm";

const FlightForm = () => {
  return (
    <Layout marginBottom="2rem">
      <CustomForm type="submit" method="POST" />
    </Layout>
  );
};

export default FlightForm;
