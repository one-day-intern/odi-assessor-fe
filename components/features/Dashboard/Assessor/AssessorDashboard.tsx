import { Button } from "@components/shared/elements/Button";
import { AddIcon } from "@components/shared/svg/AddIcon";
import { useDebounce } from "@hooks/shared/useDebounce";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AssessorDashboard.module.css";
import { EventStatusFilter } from "./EventStatusFilter";
import { FormSearch } from "../../../shared/forms/FormSearch";
import { AnimatePresence, motion } from "framer-motion";
import { AssessmentCard } from "./AssessmentCard";

type StatusFilter = "active" | "archived";

const initialAssessmentEvent: AssessmentEvent[] = [
  {
    id: "1",
    name: "Machine Learning Intern",
    date: new Date("2022-12-05"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    numberOfAssesssees: 3,
    duration: new Date("2022-10-05T06:45:00"),
  },
  {
    id: "2",
    name: "UI/UX Assessmment",
    date: new Date("2022-10-05"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    numberOfAssesssees: 3,
    duration: new Date("2022-10-05T06:45:00"),
  },
  {
    id: "3",
    name: "Group Project",
    date: new Date("2022-11-07"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    numberOfAssesssees: 3,
    duration: new Date("2022-10-05T06:45:00"),
  },
  {
    id: "4",
    name: "Group Project",
    date: new Date("2022-11-07"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    numberOfAssesssees: 3,
    duration: new Date("2022-10-05T06:45:00"),
  },
  {
    id: "5",
    name: "Group Project",
    date: new Date("2022-11-07"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    numberOfAssesssees: 3,
    duration: new Date("2022-10-05T06:45:00"),
  },
];

const AssessorDashboard = () => {
  const [searchedWords, setSearchedWords] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("active");
  const [assessmentEvents, setAssessmentEvents] = useState<AssessmentEvent[]>(
    initialAssessmentEvent
  );
  const setStatus = (status: StatusFilter) => setStatusFilter(status);
  
  const lastElement = useRef<HTMLInputElement>(null);

  const debouncedWord = useDebounce(searchedWords, 500);

  useEffect(() => {}, [debouncedWord]);

  return (
    <main id="main-content" className={styles["content"]} data-testid="main">
      <div className={styles["content__group-horizontal"]}>
        <h1 className={styles["text--heading"]}>My Assessments</h1>
        <FormSearch
          value={searchedWords}
          onInputChange={(e) => setSearchedWords(e.target.value)}
        />
      </div>
      <div className={styles["content__group-horizontal"]}>
        <EventStatusFilter status={statusFilter} setStatus={setStatus} />
        <Link href="/assessments/create">
          <Button
            variant="secondary"
            style={{
              width: "fit-content",
              padding: "0.5rem 2rem",
            }}
          >
            <AddIcon width={18} height={18} />
            <h2>Create Assessment</h2>
          </Button>
        </Link>
      </div>
      <motion.div layout className={styles["content__list"]}>
        <AnimatePresence>
          {assessmentEvents
            .filter((event) =>
              statusFilter === "active"
                ? event.date >= new Date()
                : event.date < new Date()
            )
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((event) => (
              <AssessmentCard key={event.id} {...event} />
            ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default AssessorDashboard;
