import React from "react";
import { createPortal } from "react-dom";

import Overlay from "../components/UI/Overlay";

const PracticalGuideModal = () => {
  const portal = createPortal(<Overlay />, document.getElementById("modal"));

  return <div>{portal}</div>;
};

export default PracticalGuideModal;
