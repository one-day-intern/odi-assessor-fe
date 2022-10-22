import { Multistep } from "@components/shared/layouts/Multistep";
import { useAssessorSignupStepContext } from "@context/Signup/AssessorSignupStepContext";

import React from "react";

const AssessorSignup = () => {
  
  const { forms, selectStep, selectedId } = useAssessorSignupStepContext();

  return (
    <Multistep
      elements={forms}
      selectedId={selectedId}
      selectStep={selectStep}
    />
  );
};

export { AssessorSignup };
