import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";
import { InputField } from "@components/shared/forms/InputField";
import { SelectField } from "@components/shared/forms/SelectField";
import { TextAreaField } from "@components/shared/forms/TextAreaField";
import { TimeField } from "@components/shared/forms/TimeField";
import { useCreateAssignmentStore } from "@hooks/CreateAssessmentEvent/useCreateAssignmentStore";
import useGetRequest from "@hooks/shared/useGetRequest";
import usePostRequest from "@hooks/shared/usePostRequest";
import { EXTENSIONS } from "@utils/data/fileExtensions";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import styles from "./AssignmentForm.module.css";

interface AssignmentSubmission {
  name: string;
  description: string;
  duration_in_minutes: number;
  expected_file_format: string;
}

const CREATE_ASSIGNMENT_URL = "/assessment/create/assignment/";

const AssignmentForm = () => {
  const {
    assignmentData,
    assignmentError,
    setAssignmentValue,
    setAssignmentError,
  } = useCreateAssignmentStore();

  const router = useRouter();

  const { status, postData: postAssignment } = usePostRequest<
    AssignmentSubmission,
    Assignment
  >(CREATE_ASSIGNMENT_URL, {
    requiresToken: true,
  });

  const validate = () => {
    const [isNameValid, nameError] = emptyValidator(assignmentData.name);
    setAssignmentError("name", nameError);

    const [isQuestionValid, questionError] = emptyValidator(
      assignmentData.description
    );
    setAssignmentError("description", questionError);

    const [isFileTypeValid, fileTypeError] = emptyValidator(
      assignmentData.expected_file_format
    );
    setAssignmentError("expected_file_format", fileTypeError);

    const durationList = assignmentData.duration.split(":");
    let durationValid = true;
    if (durationList.length < 2) {
      durationValid = false;
      setAssignmentError(
        "duration",
        "The duration given is not a valid duration."
      );
    }

    
    const isValid =
    isNameValid && isFileTypeValid && isQuestionValid && durationValid;
    return isValid;
  };

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const durationList = assignmentData.duration.split(":");
    const [hours, minutes] = durationList.map((num) => parseInt(num));
    const durationInMinutes = hours * 60 + minutes;

    const assignmentPost: AssignmentSubmission = {
      name: assignmentData.name,
      description: assignmentData.description,
      duration_in_minutes: durationInMinutes,
      expected_file_format: assignmentData.expected_file_format,
    };

    const response = await postAssignment(assignmentPost);
    if (response instanceof Error) {
      toast.error(response.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    toast.success("A new assignment has been created.");
    router.push("/");
  };

  return (
    <div data-testid="form-asg" className={styles["create"]}>
      <h2 className={styles["create__heading"]}>Create New Assignment</h2>

      <form className={styles["create__form"]} onSubmit={handleOnSubmit}>
        <InputField
          value={assignmentData.name}
          label="Name *"
          onChange={(e) => setAssignmentValue("name", e.target.value)}
          error={assignmentError.name}
        />
        <TextAreaField
          value={assignmentData.description}
          label="Question *"
          onChange={(e) => setAssignmentValue("description", e.target.value)}
          error={assignmentError.description}
          rows={6}
          placeholder="Type your questions here..."
        />

        <div className={styles["form__two-cols"]}>
          <SelectField
            label="File type *"
            choices={EXTENSIONS}
            onChange={(option) => {
              setAssignmentValue("expected_file_format", option?.value!);
            }}
            defaultValue={EXTENSIONS[0]}
            error={assignmentError.expected_file_format}
          />
          <TimeField
            label="Duration *"
            value={assignmentData.duration}
            onChange={(e) => setAssignmentValue("duration", e.target.value)}
            error={assignmentError.duration}
          />
        </div>

        <div className={styles["form__two-cols"]}>
          <Button
            type="button"
            variant="danger"
            style={{
              width: "fit-content",
              padding: "0.5rem 2rem",
            }}
            onClick={() => {
              router.back()
            }}
          >
            <h2>Cancel</h2>
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "fit-content",
              padding: "0.5rem 2rem",
            }}
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : <h2>Submit</h2>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;
