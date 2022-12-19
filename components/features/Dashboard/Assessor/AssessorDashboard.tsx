import { Button } from "@components/shared/elements/Button";
import { AddIcon } from "@components/shared/svg/AddIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./AssessorDashboard.module.css";
import { EventStatusFilter } from "./EventStatusFilter";
import { AnimatePresence, motion } from "framer-motion";
import { AssessmentCard } from "./AssessmentCard";
import useGetRequest from "@hooks/shared/useGetRequest";
import { toast } from "react-toastify";
import { useAuthContext } from "@context/Authentication";

type StatusFilter = "active" | "archived";

interface AssessmentEventListRequest {
  event_id: string;
  name: string;
  start_date_time: string;
}

const AssessorDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("active");
  const [assessmentEvents, setAssessmentEvents] = useState<AssessmentEvent[]>(
    []
  );
  const setStatus = (status: StatusFilter) => setStatusFilter(status);
  const { fetchData } = useGetRequest<AssessmentEventListRequest[]>(
    `/assessor/assessment-event-list/`,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAssessmentEvents = async () => {
      const response = await fetchData();
      if (response instanceof Error) {
        toast.error(response.message);
        return;
      }
      const assessmentEvents: AssessmentEvent[] = response.map((event) => ({
        event_id: event.event_id,
        name: event.name,
        numberOfAssesssees: 1,
        date: new Date(event.start_date_time),
        description: "An assessment event",
        duration: new Date(),
      }));

      setAssessmentEvents(assessmentEvents);
    };

    fetchAssessmentEvents();
    // eslint-disable-next-line
  }, [user]);

  return (
    <main id="main-content" className={styles["content"]} data-testid="main">
      <div className={styles["content__group-horizontal"]}>
        <h1 className={styles["text--heading"]}>My Assessments</h1>
        
      </div>
      <div className={styles["content__group-horizontal"]}>
        <EventStatusFilter status={statusFilter} setStatus={setStatus} />
        <Link href="/assessment/create">
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
              <AssessmentCard key={event.event_id} {...event} />
            ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default AssessorDashboard;
