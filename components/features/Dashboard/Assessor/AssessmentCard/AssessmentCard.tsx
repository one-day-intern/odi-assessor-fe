import { Button } from "@components/shared/elements/Button";
import { LockIcon } from "@components/shared/svg/LockIcon";
import { UnlockIcon } from "@components/shared/svg/UnlockIcon";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./AssessmentCard.module.css";

const AssessmentCard = ({
  name,
  date,
  description,
  duration,
  id,
  numberOfAssesssees,
}: AssessmentEvent) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles["assessment-card"]}
      data-testid="card"
    >
      <h2 className={styles["assessment-card__heading"]}>{name}</h2>
      <p
        className={`${styles["assessment-card__text"]} ${styles["assessment-card__text--blue"]}`}
      >
        {numberOfAssesssees}{" "}
        {numberOfAssesssees === 1 ? "candidate" : "candidates"} assessed
      </p>
      <p className={styles["assessment-card__text"]}>{description}</p>

      <div className={styles["assessment-card__div"]}>
        <Link href={`/assessment/${id}`}>
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
      </div>
    </motion.div>
  );
};

export default AssessmentCard;
