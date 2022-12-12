import { ClockIcon } from "@components/shared/svg/ClockIcon";
import { dateFormatter } from "@utils/formatters/dateFormatter";
import React from "react";
import sanitizeHtml from "sanitize-html";
import styles from "./ResponseTestGrade.module.css";

interface Props {
  submission: ResponseTestSubmission;
  assesseeEmail: string;
}

const ResponseTestGrade = ({ assesseeEmail, submission }: Props) => {
  const sanitizedResponse = { __html: sanitizeHtml(submission.response) };

  return (
    <div className={styles["responsetest"]} data-testid="response">
      <section
        data-testid="responsetest-grader"
        className={styles["grader__section"]}
      >
        <div className={styles["responsetest__header"]}>
          <div>
            <p className={styles["responsetest__header--text"]}>
              From{" "}
              <span className={styles["responsetest__header--bold"]}>
                {assesseeEmail}
              </span>
            </p>
            <p className={styles["responsetest__header--text"]}>to me</p>
          </div>
          <p
            className={`${styles["responsetest__header--text"]} ${styles["responsetest__header--clock"]}`}
          >
            <ClockIcon height={12} width={12} />
            {dateFormatter(new Date(submission.submitted_time), { isConditional: true })}
          </p>
        </div>
        <div className={styles["message-divisor"]}></div>
        <div>
          <p className={styles["message--label"]}>Subject</p>
          <p className={styles["message--subject"]}>{submission.subject}</p>
        </div>
        <div dangerouslySetInnerHTML={sanitizedResponse}></div>
      </section>
      <div className={styles["grader__divisor--horizontal"]}></div>
    </div>
  );
};

export default ResponseTestGrade;
