import React from "react";

import CustomForm from "./UI/CustomForm";
import classes from "./FlightForm.module.css";

const FlightForm = () => {
  return (
    <div className={classes.wrapper}>
      <CustomForm type="submit" />
    </div>
  );
};

export default FlightForm;
