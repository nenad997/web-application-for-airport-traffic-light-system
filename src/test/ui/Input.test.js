import React from "react";
import { render } from "@testing-library/react";

import Input from "../../components/UI/Input";

describe("Input component", () => {
  it("renders label correctly", () => {
    const { getByLabelText } = render(
      <Input label="Email" inputConfig={{ id: "email", type: "text" }} />
    );
    expect(getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders input correctly", () => {
    const { getByPlaceholderText } = render(
      <Input
        label="Email"
        inputConfig={{ id: "email", type: "text", placeholder: "Enter email" }}
      />
    );
    expect(getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("applies style when input is invalid", () => {
    const { getByPlaceholderText } = render(
      <Input
        label="Email"
        inputConfig={{ id: "email", type: "text", placeholder: "Enter email" }}
        isInvalid={true}
      />
    );
    const input = getByPlaceholderText("Enter email");
    expect(input).toHaveStyle("border-bottom: 3px solid red");
  });

  it("does not apply style when input is valid", () => {
    const { getByPlaceholderText } = render(
      <Input
        label="Email"
        inputConfig={{ id: "email", type: "text", placeholder: "Enter email" }}
        isInvalid={false}
      />
    );
    const input = getByPlaceholderText("Enter email");
    expect(input).not.toHaveStyle("border-bottom: 3px solid red");
  });
});
