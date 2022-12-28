import { Backdrop } from "@components/shared/layouts/Backdrop";
import { useCreateAssessmentEventDetails } from "@hooks/CreateAssessmentEvent/useCreateAssessmentEventStore/useCreateAssessmentEventDetails";
import React, { useEffect, useMemo, useState } from "react";
import AddParticipants from "./AddParticipants";
import { MultistepIndex } from "../../../shared/layouts/MultistepAssignment";
import { NameAndDateForm } from "./NameAndDateForm";
import styles from "./CreateAssessmentEvent.module.css";
import { Confirmation } from "./Confirmation";
import { AnimatePresence, motion } from "framer-motion";

interface CreateAssessmentEventProps {
  testFlows: TestFlowOption[] | null;
  assessors: AssessorOptions[] | null;
}

const wrapperVariants = {
  beforeShown: {
    x: -20,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
  shown: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  afterShown: {
    x: 20,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};



const CreateAssessmentEvent = ({ testFlows , assessors}: CreateAssessmentEventProps) => {
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
    setAssessmentErrors,
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
        component: (
          <AddParticipants
          assessorList={assessors ?? []}
            selectStep={setCurrentStep}
            addEmptyParticipation={addEmptyParticipation}
            removeParticipation={removeParticipation}
            updateParticipation={updateParticipation}
            assessmentData={assessmentData}
            validateParticipationBeforeSubmit={
              validateParticipationBeforeSubmit
            }
          />
        ),
        name: "Assign Participants",
      },
      {
        id: 2,
        component: <Confirmation {...assessmentData} />,
        name: "Confirm Event Creation",
      },
    ],
    [
      assessmentData,
      assessors,
      testFlows,
      assessmentErrors,
      setAssessmentData,
      setAssessmentErrors,
      addEmptyParticipation,
      removeParticipation,
      updateParticipation,
      validateParticipationBeforeSubmit,
    ]
  );

  return (
    <>
      <Backdrop />
      <div className={styles["multistep-wrapper"]}>
        <MultistepIndex
          currentStepId={currentStep}
          setCurrentStepId={setCurrentStepId}
          steps={steps}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[currentStep].id}
            variants={wrapperVariants}
            initial="beforeShown"
            animate="shown"
            exit="afterShown"
            className={styles["steps"]}
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default CreateAssessmentEvent;
