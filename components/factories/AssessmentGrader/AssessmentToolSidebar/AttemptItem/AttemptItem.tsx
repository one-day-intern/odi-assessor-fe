import AssignmentIcon  from "@components/shared/svg/AppIcons/AssignmentIcon";
import InteractiveQuizIcon from "@components/shared/svg/AppIcons/InteractiveQuizIcon";
import ResponseTestIcon from "@components/shared/svg/AppIcons/ResponseTestIcon";
import { CheckIcon } from "@components/shared/svg/CheckIcon";
import { CrossIcon } from "@components/shared/svg/CrossIcon";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styles from "./AttemptItem.module.css";

const iconMap: Record<string, ReactNode> = {
  responsetest: <ResponseTestIcon width={45} height={45} />,
  interactivequiz: <InteractiveQuizIcon width={45} height={45} />,
  assignment: <AssignmentIcon width={45} height={45} />,
};

const AttemptItem = ({name, type, attempt_id} : ToolAttempt) => {
  const router = useRouter();
  const usedType = type ?? "assignment";
  return (
    <div className={styles["attempt-card"]} data-testid="attemptCard">
      <h2 className={styles["attempt-title"]}>{name}</h2>
      <div className={styles["attempt-icon"]}>{iconMap[type]}</div>
      <div
        className={`${styles["attempt-submission"]} ${
          attempt_id == null
            ? styles["attempt-submission--nosubmit"]
            : styles["attempt-submission--submit"]
        }`}
      >
        {attempt_id == null ? (
          <>
            <CrossIcon width={14} height={14} color="#d75c5c" />
            <p>No attempts made</p>
          </>
        ) : (
          <button
            className={styles["attempt-link"]}
            onClick={() =>
              router.push(`/assessment/${router.query.id}/${router.query.email}/${usedType}/${attempt_id}`)
            }
          >
            <CheckIcon width={10} height={10} color="white" />
            <p>View Attempt</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default AttemptItem;
