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
  const sanitizedPrompt = {
    __html: sanitizeHtml(submission.response_test_prompt),
  };

  return (
    <div className={styles["responsetest"]} data-testid="response">
      <div className={styles["grader--vertical"]}>
        <section className={styles["grader__section"]}>
        <p>Response Test Prompt</p>
        <div className={styles["responsetest__header"]}>
          <div>
            <p className={styles["responsetest__header--text"]}>
              From{" "}
              <span className={styles["responsetest__header--bold"]}>
                {submission.response_test_sender}
              </span>
            </p>
            <p className={styles["responsetest__header--text"]}>
              to {assesseeEmail}
            </p>
          </div>
          <p
            className={`${styles["responsetest__header--text"]} ${styles["responsetest__header--clock"]}`}
          >
            <ClockIcon height={12} width={12} />
            {dateFormatter(new Date(submission.submitted_time), {
              isConditional: true,
            })}
          </p>
        </div>
        <div className={styles["message-divisor"]}></div>
        <div>
          <p className={styles["message--label"]}>Subject</p>
          <p className={styles["message--subject"]}>{submission.response_test_subject}</p>
        </div>
        <div dangerouslySetInnerHTML={sanitizedPrompt}></div>
      </section>
      <div className={styles["grade-division"]}></div>
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
            <p className={styles["responsetest__header--text"]}>
              to {submission.response_test_sender}
            </p>
          </div>
          <p
            className={`${styles["responsetest__header--text"]} ${styles["responsetest__header--clock"]}`}
          >
            <ClockIcon height={12} width={12} />
            {dateFormatter(new Date(submission.submitted_time), {
              isConditional: true,
            })}
          </p>
        </div>
        <div className={styles["message-divisor"]}></div>
        <div>
          <p className={styles["message--label"]}>Subject</p>
          <p className={styles["message--subject"]}>{submission.subject}</p>
        </div>
        <div dangerouslySetInnerHTML={sanitizedResponse}></div>
      </section>
      </div>
      <div className={styles["grader__divisor--horizontal"]}></div>
    </div>
  );
};

export default ResponseTestGrade;
