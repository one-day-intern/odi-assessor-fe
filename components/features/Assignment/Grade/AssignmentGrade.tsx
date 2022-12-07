import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";
import { ClockIcon } from "@components/shared/svg/ClockIcon";
import { FileDownloadIcon } from "@components/shared/svg/FileDownloadIcon";
import { FileIcon } from "@components/shared/svg/FileIcon";
import { GraduationIcon } from "@components/shared/svg/GraduationIcon";
import { useDownloadRequest } from "@hooks/shared/useDownloadRequest";
import { dateFormatter } from "@utils/formatters/dateFormatter";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import styles from "./AssignmentGrade.module.css";
import { SubmissionMetadata } from "./SubmissionMetadata";

interface Props {
  submission: AssignmentSubmission;
  assessmentData: Assignment;
}

const AssignmentGrade = ({ submission, assessmentData }: Props) => {
  const router = useRouter();
  const { fetchData: fetchFile, status } = useDownloadRequest(
    `/assessment/review/assignment/file/?tool-attempt-id=${router.query.attempt_id}`,
    { requiresToken: true }
  );

  const fetchFileAndDownload = async () => {
    const fileResponse = await fetchFile();

    if (fileResponse == null) return;

    if (fileResponse instanceof Error) {
      toast.error(fileResponse.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const url = URL.createObjectURL(fileResponse);
    const downloader = document.createElement("a");
    downloader.href = url;
    downloader.download = submission.filename;
    downloader.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {assessmentData == null || submission == null ? (
        <div>Loading</div>
      ) : (
        <section
          id="grader-submission"
          data-testid="assignment-grader"
          className={styles["grader__section"]}
        >
          <div className={styles["grader__row"]}>
            <div className={styles["grader__column"]}>
              <h4 className={styles["grader__subtitle"]}>Submission Details</h4>
              <SubmissionMetadata
                label="Submission time"
                content={dateFormatter(new Date(submission.submitted_time), {
                  isConditional: false,
                  returnsComplete: true,
                  showsTime: true,
                })}
                icon={<ClockIcon width={14} height={14} />}
              />
              <SubmissionMetadata
                label="Current grade"
                content={submission.grade.toFixed(1)}
                icon={<GraduationIcon width={14} height={14} />}
              />
              <SubmissionMetadata
                label="File name"
                content={submission.filename}
                icon={<FileIcon width={14} height={14} />}
              />
              <div>
                <p className={styles["grader__subheading"]}>Notes</p>
                <p className={styles["grader__notes"]}>
                  {submission.note || "-"}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={fetchFileAndDownload}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader />
                ) : (
                  <div className={styles["grader__row"]}>
                    <FileDownloadIcon width={16} height={16} color="white" />
                    <h2>Download File</h2>
                  </div>
                )}
              </Button>
            </div>
            <div className={styles["grader__divisor--horizontal"]}></div>
          </div>
        </section>
      )}
    </>
  );
};

export default AssignmentGrade;
