import { Backdrop } from "@components/shared/layouts/Backdrop";
import { useCreateAssessmentEventDetails } from "@hooks/CreateAssessmentEvent/useCreateAssessmentEventStore/useCreateAssessmentEventDetails";
import React, { useMemo, useState } from "react";
import AddParticipants from "./AddParticipants";
import { MultistepIndex } from "./MultistepIndicator";
import { NameAndDateForm } from "./NameAndDateForm";

const CreateAssessmentEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const setCurrentStepId = (id: number) => setCurrentStep(id);

  const {
    assessmentData,
    setAssessmentData,
    assessmentErrors,
    setAssessmentErrors,
  } = useCreateAssessmentEventDetails();

  const steps: Step[] = useMemo(
    () => [
      {
        id: 0,
        component: <NameAndDateForm selectStep={setCurrentStep} assessmentData={assessmentData} setAssessmentData={setAssessmentData} assessmentErrors={assessmentErrors} setAssessmentErrors={setAssessmentErrors} />,
        name: "Create Assessment Event",
      },
      {
        id: 1,
        component: <AddParticipants assessmentData={assessmentData} setAssessmentData={setAssessmentData} assessmentErrors={assessmentErrors} setAssessmentErrors={setAssessmentErrors} />,
        name: "Assign Participants",
      },
    ],
    [assessmentData, assessmentErrors, setAssessmentData, setAssessmentErrors]
  );

  return (
    <Backdrop>
      <MultistepIndex
        currentStepId={currentStep}
        setCurrentStepId={setCurrentStepId}
        steps={steps}
      />
      {steps[currentStep].component}
    </Backdrop>
  );
};

export default CreateAssessmentEvent;
