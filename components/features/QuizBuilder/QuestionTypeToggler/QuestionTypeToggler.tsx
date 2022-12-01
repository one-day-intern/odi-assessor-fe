import React from "react";
import styles from "./QuestionTypeToggler.module.css";
import Select from "react-select";

interface Props {
  onToggle: (type: "mcq" | "essay") => void;
  currentType: "mcq" | "essay";
}

const QuestionTypeToggler: React.FC<Props> = ({ onToggle, currentType }) => {
  const currentVal = {
    value: currentType,
    label: currentType === "mcq" ? "Multiple Choice" : "Essay",
  };
  return (
    <div className={styles["toggle-container"]}>
      <label htmlFor="QuestionType">Question Type:</label>
      <div
        data-testid="QuestionType"
        style={{ width: 185, fontWeight: "bold" }}
      >
        <Select
          key={currentType}
          id="QuestionType"
          options={[
            { value: "mcq", label: "Multiple Choice" },
            { value: "essay", label: "Essay" },
          ]}
          defaultValue={currentVal}
          isSearchable={false}
          onChange={(val) => onToggle(val!.value)}
        />
      </div>
    </div>
  );
};

export default QuestionTypeToggler;
