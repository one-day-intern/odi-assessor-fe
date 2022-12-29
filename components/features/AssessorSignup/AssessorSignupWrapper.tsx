import { AssessorSignupStepProvider } from "@context/Signup/AssessorSignupStepContext";
import { AssessorSignupStoreProvider } from "@context/Signup/AssessorSignupStoreContext";
import React from "react";
import { AssessorSignup } from "./AssessorSignup";

interface Props {
  googleLoginCallback: () => void;
}

const AssessorSignupWrapper = ({ googleLoginCallback } : Props) => {
  return (
    <AssessorSignupStepProvider googleLoginCallback={googleLoginCallback}>
      <AssessorSignupStoreProvider>
        <AssessorSignup />
      </AssessorSignupStoreProvider>
    </AssessorSignupStepProvider>
  );
};

export default AssessorSignupWrapper;
