import { AssignmentGrade } from "@components/features/Assignment/Grade";
import { ResponseTestGrade } from "@components/features/ResponseTest/Grade";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styles from "./AssessmentGrader.module.css";
import { AssessmentToolSidebar } from "./AssessmentToolSidebar";
import { GradingForm } from "./GradingForm";

interface Props {
  type: "responsetest" | "interactivequiz" | "assignment";
  submission: Submission;
  assessmentData: AssessmentTool;
  sidebarMetadata: {
    name: string;
    grade: number;
    progress: number;
    attempts: ToolAttempt[];
  };
  loadingStatus: "initial" | "loading" | "fetched" | "error";
  grader: (grade: number, note: string) => Promise<void>;
}

const AssessmentGrader = ({
  type,
  submission,
  sidebarMetadata,
  assessmentData,
  grader,
  loadingStatus,
}: Props) => {
  const router = useRouter();
  console.log(submission);
  const displayedComponent = useMemo(() => {
    switch (type) {
      case "assignment":
        return (
          <AssignmentGrade
            submission={submission as AssignmentSubmission}
            assessmentData={assessmentData as Assignment}
          />
        );
      case "responsetest":
        return <ResponseTestGrade
        submission={submission as ResponseTestSubmission}
        assesseeEmail={router.query.email as string}
      />;
      case "interactivequiz":
        return <div>Interactive Quiz</div>;
      default:
        return <div></div>
    }
  }, [
    submission,
    assessmentData,
    router.query.email,
    type
  ]);

  return (
    <main className={styles["grader-wrapper"]} data-testid="assessment-grader">
      <AssessmentToolSidebar {...sidebarMetadata} />
      <div className={styles["grader"]}>
        <section id="grader-metadata" className={styles["grader__section"]}>
          <h2 className={styles["grader__title"]}>{assessmentData?.name}</h2>
          <p className={styles["grader__content"]}>
            {assessmentData?.description}
          </p>
        </section>
        <div className={styles["grader__divisor"]}></div>
        <div className={styles["displayed-row"]}>
          {displayedComponent}
          <GradingForm grader={grader} status={loadingStatus} />
        </div>
      </div>
    </main>
  );
};

export default AssessmentGrader;
