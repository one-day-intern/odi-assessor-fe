import { Button } from "@components/shared/elements/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import styles from "./AssessmentCard.module.css";
import { ClockIcon } from "@components/shared/svg/ClockIcon";
import { dateFormatter } from "@utils/formatters/dateFormatter";
import { useAuthContext } from "@context/Authentication";

interface AssessmentCardProps {
  name: string;
  date: Date;
  description: string;
  event_id: string;
}

const AssessmentCard = ({
  name,
  date,
  description,
  event_id,
}: AssessmentCardProps) => {
  const { user } = useAuthContext();
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

      <p className={styles["assessment-card__text"]}>{description}</p>
      <p className={styles["assessment-card__text"]}>
        <ClockIcon width={15} height={15}/>
        {dateFormatter(date, { isConditional: false, returnsComplete: true})}
      </p>
      
      { user?.hasOwnProperty("employee_id") &&
        <div className={styles["assessment-card__div"]}>
          <Link href={`/assessment/${event_id}`}>
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
      }
    </motion.div>
  );
};

export default AssessmentCard;
