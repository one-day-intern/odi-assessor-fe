import { AssessorSignupStepProvider } from "@context/Signup/AssessorSignupStepContext";
import { AssessorSignupStoreProvider } from "@context/Signup/AssessorSignupStoreContext";
import React from "react";
import { AssessorSignup } from "./AssessorSignup";

const AssessorSignupWrapper = () => {
  return (
    <AssessorSignupStepProvider>
      <AssessorSignupStoreProvider>
        <AssessorSignup />
      </AssessorSignupStoreProvider>
    </AssessorSignupStepProvider>
  );
};

export default AssessorSignupWrapper;
