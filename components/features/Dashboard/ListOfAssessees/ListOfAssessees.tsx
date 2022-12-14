import React, { useEffect, useState } from "react";
import styles from "./ListOfAssesees.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { AssessmentParticipationCard } from "./AssessmentParticipationCard";
import { useRouter } from "next/router";

interface Props extends React.PropsWithChildren {
  assessees: AssessmentEventParticipation[];
}

const ListOfAssessees: React.FC<Props> = ({ assessees }) => {
  const [_, setAsgEventId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (router.query.id != null) {
      setAsgEventId(router.query.id as string);
    }

    // assignment event ID
  }, [router.query.id]);

  return (
    <main id="main-content" className={styles["content"]} data-testid="main">
      <div className={styles["content__group-horizontal"]}>
        <h1 className={styles["text--heading"]}>My Assessments</h1>
      </div>
      <motion.div layout className={styles["content__list"]}>
        <AnimatePresence>
          {[...assessees]
            ?.sort((a, b) => a.assesseeName.localeCompare(b.assesseeName))
            .map((participation) => (
              <AssessmentParticipationCard
                key={participation.assesseeEmail}
                assesseeName={participation.assesseeName}
                assesseeEmail={participation.assesseeEmail}
                assessmentEventId={participation.assessmentEventId}
              />
            ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default ListOfAssessees;
