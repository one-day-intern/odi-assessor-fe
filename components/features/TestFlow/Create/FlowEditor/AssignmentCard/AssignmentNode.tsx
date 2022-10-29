import { Loader } from "@components/shared/elements/Loader";
import React, { lazy, Suspense } from "react";
import { Handle, Position } from "reactflow";
import styles from "./AssignmentNode.module.css";

interface Props {
  data: AssignmentNode;
}

const InteractiveQuizIcon = lazy(
  () => import("@components/shared/svg/AppIcons/InteractiveQuizIcon")
);
const ResponseTestIcon = lazy(
  () => import("@components/shared/svg/AppIcons/ResponseTestIcon")
);
const VideoConferenceIcon = lazy(
  () => import("@components/shared/svg/AppIcons/VideoConferenceIcon")
);

const AssignmentCard = ({ data }: Props) => {
  const { id, asg, release_time, start_time } = data;
  const { tool_id, name, type } = asg!;

  return (
    <>
      <Handle position={Position.Top} type="target" />
      <div className={styles["asg-card"]} data-testid="asg-card">
        <div className={styles["asg-card__icon"]}>
          <Suspense fallback={<div></div>}>
            {type === "quiz" ? (
              <InteractiveQuizIcon width={50} height={50} />
            ) : type === "response" ? (
              <ResponseTestIcon width={50} height={50} />
            ) : (
              <VideoConferenceIcon width={50} height={50} />
            )}
          </Suspense>
        </div>
        <h6 className={styles["asg-card__name"]}>{name}</h6>
        <div className={styles["asg-card__time"]}>
          <p>{ release_time }</p>
        </div>
      </div>
      <Handle position={Position.Bottom} type="source" />
    </>
  );
};

export default AssignmentCard;
