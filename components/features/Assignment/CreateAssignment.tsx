import { Backdrop } from "@components/shared/layouts/Backdrop";
import { MultistepIndex } from "@components/shared/layouts/MultistepAssignment";
import React from "react";
import { AssignmentForm } from "./AssignmentForm";
import styles from "./CreateAssignment.module.css";

const CreateAssignment = () => {
  return (
    <>
      <Backdrop />
      <div className={styles["create-assignment"]} data-testid="main">
      <MultistepIndex
          currentStepId={0}
          setCurrentStepId={() => {}}
          steps={[]}
        />
        <AssignmentForm/>
      </div>
    </>
  );
};

export default CreateAssignment;
