import { InputField } from "@components/shared/forms/InputField";
import styles from "./GradingForm.module.css";
import React, { useCallback, useState } from "react";
import { TextAreaField } from "@components/shared/forms/TextAreaField";
import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";

interface Props {
  grader: (grade: number, note: string) => Promise<void>;
  status: "initial" | "loading" | "fetched" | "error"
}

const GradingForm = ({ grader, status } : Props) => {
  
  const [gradeInput, setGradeInput] = useState("");
  const [notes, setNotes] = useState("");

  const forceTextIntoNumber = (inputtedNumber: string) => {
    const parsedNumber = Number(inputtedNumber);
    setGradeInput((prev) =>
      Number.isNaN(parsedNumber) ? prev : inputtedNumber
    );
  };

  const numberChangeHandler: React.ChangeEventHandler = useCallback((e) => forceTextIntoNumber((e.target as HTMLInputElement).value), []);


  const submitHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();
    grader(Number(gradeInput), notes);
  };

  return (
    <form onSubmit={submitHandler} className={styles["grade-form"]} data-testid="grading-form">
      <h4 className={styles["grade-input__title"]}>Grading</h4>
      <div className={styles["grade-input__row"]}>
        <div className={styles["grade-input__wrapper"]}>
          <InputField
            label="Grade"
            onChange={numberChangeHandler}
            value={gradeInput}
          />
        </div>
        <p className={styles["grade-input__percent"]}>/ 100</p>
      </div>
      <TextAreaField
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
        label="Notes"
        rows={3}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={gradeInput === "" || status === "loading"}
      >
        {status === "loading" ? <Loader /> : <h2>Grade</h2>}
      </Button>
    </form>
  );
};

export default GradingForm;
