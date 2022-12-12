import { GradeDetail } from "@components/shared/elements/GradeDetail";
import Avatar from "@components/shared/svg/Avatar";
import React from "react";
import styles from "./GradeReport.module.css";
import { GradeReportRow } from "./GradeReportRow";

interface Props {
  assesseeEmail: string;
  listOfGrades: GradeReportModel[];
}

type AssessmentType = "interactivequiz" | "assignment" | "responsetest";

const GradeReport = ({ assesseeEmail, listOfGrades }: Props) => {
  const overallGrade = listOfGrades?.reduce((prev, current) => prev + current.grade, 0);
  const average = listOfGrades?.length === 0 ? 0 : overallGrade/listOfGrades?.length;

  return (
    <main className={styles["report"]} data-testid="main">
      <h2 className={styles["report__heading"]}>Grade Report</h2>
      <div className={styles["report__card"]}>
        <div className={styles["report__id"]}>
          <p>
            <Avatar width={14} height={14} /> User
          </p>
          <p className={styles["report__name"]}>{assesseeEmail}</p>
        </div>
        <GradeDetail grade={average}/>
      </div>
      <div className={styles["divisor"]}></div>
      <div className={styles["group"]}>
        <p>Grade Details</p>
        {listOfGrades?.map((item) => (
          <GradeReportRow
            key={`${item.tool_name}-${item.type}`}
            grade={item.grade}
            is_attempted={item.is_attempted}
            tool_name={item.tool_name}
            type={item.type as AssessmentType}
          />
        ))}
      </div>
    </main>
  );
};

export default GradeReport;
