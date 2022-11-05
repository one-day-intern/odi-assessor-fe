import { DateField } from "@components/shared/forms/DateField";
import { InputField } from "@components/shared/forms/InputField";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./NameAndDateForm.module.css";
import Flatpickr from "react-flatpickr";
import { Button } from "@components/shared/elements/Button";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { dateValidator } from "@utils/validators/dateValidator/dateValidator";
import SelectField from "@components/shared/forms/SelectField/SelectField";

interface NameAndDateFormProps {
  selectStep: (id: number) => void;
  assessmentData: CreateAssessmentDetailsSubmission;
  setAssessmentData: (
    key: keyof CreateAssessmentDetailsSubmission,
    value: string | ParticipantsManyToMany | TestFlow
  ) => void;
  assessmentErrors: CreateAssessmentDetailsError;
  setAssessmentErrors: (
    key: keyof CreateAssessmentDetailsSubmission,
    value: string
  ) => void;
  testFlowList: TestFlowOption[] | null;
}

interface CreateAssessmentDetailsSubmission {
  name: string;
  start_date: string;
  test_flow: TestFlow | null;
}

type CreateAssessmentDetailsError = {
  [Property in keyof CreateAssessmentDetailsSubmission]: string;
};

const GET_TEST_FLOWS_URL = "/assessment/test-flow/all/";

const NameAndDateForm = ({
  selectStep,
  assessmentData,
  assessmentErrors,
  setAssessmentData,
  setAssessmentErrors,
  testFlowList,
}: NameAndDateFormProps) => {
  const handleSubmitEvent: React.FormEventHandler = (e) => {
    e.preventDefault();

    const [isNameValid, nameError] = emptyValidator(assessmentData.name);
    setAssessmentErrors("name", nameError);

    const [isDateValid, dateError] = dateValidator(assessmentData.start_date);
    setAssessmentErrors("start_date", dateError);

    const [isTestFlowIdValid, testFlowError] = emptyValidator(
      assessmentData?.test_flow?.test_flow_id!
    );
    setAssessmentErrors("test_flow", testFlowError);

    const isValid = isNameValid && isDateValid && isTestFlowIdValid;
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

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error =
        assessmentErrors[field as keyof CreateAssessmentDetailsSubmission];
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
    <>
      {testFlowList != null ? (
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
                minDate={new Date()}
                date={assessmentData.start_date}
              />

              <SelectField
                choices={choices ?? []}
                onChange={(option: TestFlowOption | null) => {
                  setAssessmentData("test_flow", option?.value!);
                }}
                defaultValue={
                  assessmentData.test_flow != null
                    ? {
                        value: assessmentData.test_flow,
                        label: assessmentData.test_flow.name!,
                      }
                    : undefined
                }
                label="Test Flow *"
                error={assessmentErrors.test_flow}
              />

              <Button
                style={{
                  width: "fit-content",
                  padding: "0.5rem 3rem",
                  alignSelf: "end",
                }}
                type="submit"
                variant="primary"
                disabled={false}
              >
                <h2>Next</h2>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default NameAndDateForm;
