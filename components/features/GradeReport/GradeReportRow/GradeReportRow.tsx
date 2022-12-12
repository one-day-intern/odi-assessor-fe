import AssignmentIcon from "@components/shared/svg/AppIcons/AssignmentIcon";
import InteractiveQuizIcon from "@components/shared/svg/AppIcons/InteractiveQuizIcon";
import ResponseTestIcon from "@components/shared/svg/AppIcons/ResponseTestIcon";
import { CheckIcon } from "@components/shared/svg/CheckIcon";
import { CrossIcon } from "@components/shared/svg/CrossIcon";
import React, { ReactNode } from "react";
import styles from "./GradeReportRow.module.css";

type AssessmentType = "assignment" | "responsetest" | "interactivequiz";

interface Props {
  tool_name: string;
  is_attempted: boolean;
  grade: number;
  type: AssessmentType;
}

const iconMap: Record<AssessmentType, ReactNode> = {
  assignment: <AssignmentIcon width={45} height={45} />,
  responsetest: <ResponseTestIcon width={45} height={45} />,
  interactivequiz: <InteractiveQuizIcon width={45} height={45} />,
};

const GradeReportRow = ({ tool_name, is_attempted, grade, type }: Props) => {
  return (
    <div className={styles["card"]} data-testid="report">
      <div className={styles["card--row"]}>
        {iconMap[type]}
        <div className={styles["card--column"]}>
          <p className={styles["card__name"]}>{tool_name}</p>
          <div className={styles["card__is-attempted"]}>
            {is_attempted ? (
              <>
                <CheckIcon width={15} height={15} color="#2a6b3f" />
                <p className={styles["card__is-attempted--yes"]}>
                  1 Attempt Made
                </p>
              </>
            ) : (
              <>
                <CrossIcon width={15} height={15} color="#d75c5c" />
                <p className={styles["card__is-attempted--no"]}>
                  No Attempts Made
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles["card--column"]}>
        <p className={styles["grade--label"]}>Grade:</p>
        <p className={styles["grade"]}>{grade.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default GradeReportRow;
