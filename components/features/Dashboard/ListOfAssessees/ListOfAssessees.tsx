import { useDebounce } from "@hooks/shared/useDebounce";
import React, { useEffect, useState } from "react";
import styles from "./ListOfAssesees.module.css";
import { FormSearch } from "../../../shared/forms/FormSearch";
import { AnimatePresence, motion } from "framer-motion";
import { AssessmentParticipationCard } from "./AssessmentParticipationCard";
import { useRouter } from "next/router";

const initialAssessmentEvent: AssessmentEventParticipation[] = [
  {
    assesseeEmail: "rashad@aziz.com",
    assesseeName: "Rashad",
    assessmentEventId: "jkasfdlk;udsaio",
  },
  {
    assesseeEmail: "indira@jakslfaskjl.com",
    assesseeName: "Indira",
    assessmentEventId: "jkasfdlk;udsaio",
  }
];

interface Props extends React.PropsWithChildren {
  assessees: AssessmentEventParticipation[];
}

const ListOfAssessees: React.FC<Props> = ({ assessees }) => {
  const [searchedWords, setSearchedWords] = useState("");
  const [participations, setParticipations] = useState<
    AssessmentEventParticipation[]
  >(initialAssessmentEvent);
  const [asgEventId, setAsgEventId] = useState("");

  const router = useRouter();

  const debouncedWord = useDebounce(searchedWords, 500);

  useEffect(() => {}, [debouncedWord]);

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
        <FormSearch
          value={searchedWords}
          onInputChange={(e) => setSearchedWords(e.target.value)}
        />
      </div>
      <motion.div layout className={styles["content__list"]}>
        <AnimatePresence>
          {assessees
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
