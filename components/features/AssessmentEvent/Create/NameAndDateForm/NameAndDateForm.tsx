import { DateField } from "@components/shared/forms/DateField";
import { InputField } from "@components/shared/forms/InputField";
import { useCreateAssessmentEventDetails } from "@hooks/CreateAssessmentEvent/useCreateAssessmentEventStore/useCreateAssessmentEventDetails";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./NameAndDateForm.module.css";
import Flatpickr from "react-flatpickr";
import { Button } from "@components/shared/elements/Button";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { dateValidator } from "@utils/validators/dateValidator/dateValidator";
import useGetRequest from "@hooks/shared/useGetRequest";
import Select from "react-select";

interface NameAndDateFormProps {
  selectStep: (id: number) => void;
  assessmentData: CreateAssessmentDetailsSubmission,
  setAssessmentData: (key: keyof CreateAssessmentDetailsSubmission, value: string | ParticipantsManyToMany[]) => void,
  assessmentErrors: CreateAssessmentDetailsSubmission,
  setAssessmentErrors: (key: keyof CreateAssessmentDetailsSubmission, value: string) => void
}

interface CreateAssessmentDetailsSubmission {
  name: string;
  start_date: string;
  test_flow_id: string;
}

interface TestFlowOption {
  readonly value: TestFlow;
  readonly label: string;

}

const GET_TEST_FLOWS_URL = "/assessment/test-flow/all/"

const NameAndDateForm = ({ selectStep, assessmentData, assessmentErrors, setAssessmentData, setAssessmentErrors }: NameAndDateFormProps) => {
  const handleSubmitEvent: React.FormEventHandler = (e) => {
    e.preventDefault();

    const [isNameValid, nameError] = emptyValidator(assessmentData.name);
    setAssessmentErrors("name", nameError);

    const [isDateValid, dateError] = dateValidator(assessmentData.start_date);
    setAssessmentErrors("start_date", dateError);

    const isValid = isNameValid && isDateValid;
    if (!isValid) return;
    selectStep(1);
  };

  

  const nameInputRef = useRef<HTMLInputElement>(null);
  const dateField = useRef<Flatpickr>(null);
  const inputRefs = useMemo(
    () => ({
      name: nameInputRef,
      start_date: dateField,
    }),
    []
  );
  const [choices, setChoices] = useState<TestFlowOption[]>();

  const { data, error, fetchData } = useGetRequest<TestFlow[]>(GET_TEST_FLOWS_URL, {
    requiresToken: true
  });

  useEffect(() => {
    setChoices(data?.map(
      testFlow => ({
        value: testFlow,
        label: testFlow.name
      })
    ))
  }, [data])

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error =
        assessmentErrors[field! as keyof CreateAssessmentDetailsSubmission];
      if (error) {
        const elementRef = inputRefs[field as keyof typeof inputRefs];
        if (elementRef?.current instanceof Flatpickr) {
          elementRef?.current?.flatpickr?.altInput?.focus();
          return;
        }
        elementRef?.current?.focus();
        return;
      }
    }
  }, [assessmentErrors, inputRefs]);

  return (
    <div className={styles["name-form"]} data-testid="name-form">
      <form onSubmit={handleSubmitEvent} className={styles["form"]}>
        <h2 className={styles["form__heading"]}>Create Assessment Event</h2>
        <div className={styles["form__input-fields"]}>
          <InputField
            ref={nameInputRef}
            value={assessmentData.name}
            error={assessmentErrors.name}
            label="Name *"
            onChange={(e) => setAssessmentData("name", e.target.value)}
          />
          <DateField
            reference={dateField}
            label="Date of Assessment *"
            error={assessmentErrors.name}
            onChange={(__, dateStr, _) =>
              setAssessmentData("start_date", dateStr)
            }
          />

          <Select options={choices} onChange={(option: TestFlowOption | null) => { 
            setAssessmentData("test_flow_id", option?.value.test_flow_id!);
          }}  />

          <Button style={{
            width: "fit-content",
            padding: "0.5rem 3rem",
            alignSelf: "end"
          }} type="submit" variant="primary" disabled={false}>
            <h2>Next</h2>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NameAndDateForm;
