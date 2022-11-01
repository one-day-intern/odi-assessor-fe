import React from "react";
import styles from "./MultistepIndex.module.css";
import { MultistepNumber } from "./MultistepNumber";

interface MultistepIndexProps {
  currentStepId: number;
  setCurrentStepId: (newStepId: number) => void;
  onCancel?: () => void;
  steps: Step[];
}

const MultistepIndex = ({
  currentStepId,
  setCurrentStepId,
  steps,
}: MultistepIndexProps) => {
  return (
    <div className={styles["multistep"]} data-testid="multistep">
      {steps.map((step) => (
        <MultistepNumber
          isPrevious={currentStepId > step.id}
          isSelected={currentStepId === step.id}
          key={step.id}
          {...step}
          onSelect={() => setCurrentStepId(step.id)}
        />
      ))}
    </div>
  );
};

export default MultistepIndex;
