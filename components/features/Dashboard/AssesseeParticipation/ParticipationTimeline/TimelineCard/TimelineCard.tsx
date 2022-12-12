import AssignmentIcon from "@components/shared/svg/AppIcons/AssignmentIcon";
import InteractiveQuizIcon from "@components/shared/svg/AppIcons/InteractiveQuizIcon";
import ResponseTestIcon from "@components/shared/svg/AppIcons/ResponseTestIcon";
import { CheckIcon } from "@components/shared/svg/CheckIcon";
import { CrossIcon } from "@components/shared/svg/CrossIcon";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Handle, Position } from "reactflow";
import styles from "./TimelineCard.module.css";

interface Props {
  data: ToolAttempt;
}

const iconMap: Record<string, ReactNode> = {
  responsetest: <ResponseTestIcon width={45} height={45} />,
  interactivequiz: <InteractiveQuizIcon width={45} height={45} />,
  assignment: <AssignmentIcon width={45} height={45} />,
};

const TimelineCard = ({ data }: Props) => {
  const router = useRouter();

  return (
    <>
      <Handle position={Position.Left} type="target" isConnectable={false} />
      <div className={styles["timeline-card"]}>
        <h2 className={styles["timeline-title"]}>{data.name}</h2>
        <div className={styles["timeline-icon"]}>{iconMap[data.type]}</div>
        <div
          className={`${styles["timeline-submission"]} ${
            data.attempt_id == null
              ? styles["timeline-submission--nosubmit"]
              : styles["timeline-submission--submit"]
          }`}
        >
          {data.attempt_id == null ? (
            <>
              <CrossIcon width={14} height={14} color="#d75c5c" />
              <p>No attempts made</p>
            </>
          ) : (
            <button
              className={styles["timeline-link"]}
              onClick={() =>
                router.push(
                  `/assessment/${router.query.id}/${router.query.email}/${data.type}/${data.attempt_id}`
                )
              }
            >
              <CheckIcon width={14} height={14} color="white" />
              <p>View Attempt</p>
            </button>
          )}
        </div>
      </div>
      <Handle position={Position.Right} type="source" isConnectable={false} />
    </>
  );
};

export default TimelineCard;
