import styles from "./SubmissionMetadata.module.css";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  content: string | number;
}

const SubmissionMetadata = ({ icon, label, content }: Props) => {
  return (
    <div data-testid="submetadata" className={styles["time-grid"]}>
      {icon}
      <p>{label}</p>
      <p className={styles["time-text"]}>{content}</p>
    </div>
  );
};

export default SubmissionMetadata;
