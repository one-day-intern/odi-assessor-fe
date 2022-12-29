import React from "react";
import styles from "./AssessmentToolSidebar.module.css";
import { CircularProgressBar } from "@components/shared/elements/CircularProgressBar";
import { GradeDetail } from "@components/shared/elements/GradeDetail";
import { AttemptItem } from "./AttemptItem";

interface Props {
  name: string;
  grade: number;
  progress: number;
  attempts: ToolAttempt[];
}

const AssessmentToolSidebar = ({ name, grade, progress, attempts }: Props) => {
  return (
    <aside className={styles["progress-aside"]} data-testid="tool-sidebar">
      <div className={styles["progress-card"]}>
        <p>{name}</p>
        <div className={styles["progress-card__row"]}>
          <div className={styles["progress-card__item"]}>
            <GradeDetail
              grade={grade}
              options={{
                fontSize: "2rem",
                labelSize: "0.9rem",
                labelColor: "black",
              }}
            />
          </div>
          <div className={styles["progress-card__item"]}>
            <p>Assessment Progress</p>
            <CircularProgressBar
              progress={progress}
              options={{ fontSize: "1rem", size: "7ch" }}
            />
          </div>
        </div>
      </div>
      <div className={styles["progress-assessment-list"]}>
        { attempts?.map(attempt => <AttemptItem key={attempt.assessment_id} {...attempt}/>)}
      </div>
    </aside>
  );
};

export default AssessmentToolSidebar;
