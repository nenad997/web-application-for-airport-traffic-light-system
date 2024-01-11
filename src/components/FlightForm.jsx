import React from "react";

import Layout from "./UI/Layout";
import CustomForm from "./UI/CustomForm";

const FlightForm = ({ errors }) => {
  return (
    <Layout marginBottom="2rem">
      <CustomForm type="submit" method="POST" errors={errors} />
    </Layout>
  );
};

export default FlightForm;
