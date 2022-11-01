import { Button } from "@components/shared/elements/Button";
import { LockIcon } from "@components/shared/svg/LockIcon";
import { UnlockIcon } from "@components/shared/svg/UnlockIcon";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./AssessmentParticipationCard.module.css";

const AssessmentParticipationCard = ({
  assesseeName,
  assesseeEmail,
  assessmentEventId,
}: AssessmentEventParticipation) => {
  const [roomId, setRoomId] = useState("asdfasdf");
  const [isLocked, setIsLocked] = useState(true);

  const unlockRoomVideo = () => setIsLocked((prev) => !prev);

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles["assessment-card"]}
      data-testid="card"
    >
      <h2 className={styles["assessment-card__heading"]}>{assesseeName}</h2>

      <div className={styles["assessment-card__div"]}>
        <Link href={`/assessment/${assessmentEventId}/${assesseeEmail}`}>
          <Button
            type="button"
            variant="primary"
            style={{
              margin: 0,
              width: "fit-content",
              padding: "0.5rem 3rem",
            }}
          >
            <p>View</p>
          </Button>
        </Link>

        <div className={styles["group-lock"]}>
          <button className={styles["lock-button"]} onClick={unlockRoomVideo}>
            {isLocked ? (
              <LockIcon height={20} width={20} color={"#3d65d8"} />
            ) : (
              <UnlockIcon height={20} width={20} color={"#3d65d8"} />
            )}
          </button>
          <Button
            style={{
              margin: 0,
              width: "fit-content",
            }}
            disabled={roomId == null || isLocked}
            variant="secondary"
          >
            <p>Start Conference</p>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentParticipationCard;
