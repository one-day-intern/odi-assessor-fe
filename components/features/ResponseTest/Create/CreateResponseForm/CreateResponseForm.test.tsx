import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CreateResponseForm from "./CreateResponseForm";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";

const data = {
  message: "",
  subject: "",
  name: "",
  sender: ""
};

const error = {
  message: "",
  subject: "",
  name: "",
  sender: ""
};

const setDataValue = jest.fn();
const submitHandler = jest.fn();

describe("Create Response Form test suite", () => {
  it("Test if element rendered when response form is loading", () => {
    render(
      <CreateResponseForm status="loading" data={data} error={error} setDataValue={setDataValue} submitHandler={submitHandler}>
        <p>Test</p>
      </CreateResponseForm>
    );
    const mainContent = screen.getByTestId("response-form");
    expect(mainContent).toBeInTheDocument();
  });

  it("Test if element rendered when response form is initial", () => {
    render(
      <CreateResponseForm status="initial" data={data} error={error} setDataValue={setDataValue} submitHandler={submitHandler}>
        <p>Test</p>
      </CreateResponseForm>
    );
    const mainContent = screen.getByTestId("response-form");
    expect(mainContent).toBeInTheDocument();
  });
});
