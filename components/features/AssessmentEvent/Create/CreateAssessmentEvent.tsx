import { Backdrop } from "@components/shared/layouts/Backdrop";
import { useCreateAssessmentEventDetails } from "@hooks/CreateAssessmentEvent/useCreateAssessmentEventStore/useCreateAssessmentEventDetails";
import React, { useMemo, useState } from "react";
import AddParticipants from "./AddParticipants";
import { MultistepIndex } from "../../../shared/layouts/MultistepAssignment";
import { NameAndDateForm } from "./NameAndDateForm";
import styles from "./CreateAssessmentEvent.module.css";
import { Confirmation } from "./Confirmation";

interface CreateAssessmentEventProps {
  testFlows: TestFlowOption[] | null;
}

const CreateAssessmentEvent = ({ testFlows } : CreateAssessmentEventProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const setCurrentStepId = (id: number) => setCurrentStep(id);

  const {
    addEmptyParticipation,
    removeParticipation,
    updateParticipation,
    assessmentData,
    assessmentErrors,
    validateParticipationBeforeSubmit,
    setAssessmentData,
    setAssessmentErrors
  } = useCreateAssessmentEventDetails();

  const steps: Step[] = useMemo(
    () => [
      {
        id: 0,
        component: (
          <NameAndDateForm
            selectStep={setCurrentStep}
            assessmentData={assessmentData}
            setAssessmentData={setAssessmentData}
            assessmentErrors={assessmentErrors}
            setAssessmentErrors={setAssessmentErrors}
            testFlowList={testFlows}
          />
        ),
        name: "Create Assessment Event",
      },
      {
        id: 1,
        component: <AddParticipants 
        selectStep={setCurrentStep}
        addEmptyParticipation={addEmptyParticipation}
        removeParticipation={removeParticipation}
        updateParticipation={updateParticipation}
        assessmentData={assessmentData}
        validateParticipationBeforeSubmit={validateParticipationBeforeSubmit}/>,
        name: "Assign Participants",
      },
      {
        id: 2,
        component: <Confirmation {...assessmentData}/>,
        name: "Confirm Event Creation"
      }
    ],
    [assessmentData, testFlows, assessmentErrors, setAssessmentData, setAssessmentErrors, addEmptyParticipation, removeParticipation, updateParticipation, validateParticipationBeforeSubmit]
  );

  return (
    <>
      <Backdrop/>
      <div className={styles["multistep-wrapper"]}>
        <MultistepIndex
          currentStepId={currentStep}
          setCurrentStepId={setCurrentStepId}
          steps={steps}
        />
        {steps[currentStep].component}
      </div>
    </>
  );
};

export default CreateAssessmentEvent;
