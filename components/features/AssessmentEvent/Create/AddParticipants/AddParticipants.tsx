import { Button } from "@components/shared/elements/Button";
import { InputField } from "@components/shared/forms/InputField";
import { useCreateAssessmentEventDetails } from "@hooks/CreateAssessmentEvent/useCreateAssessmentEventStore/useCreateAssessmentEventDetails";
import usePostRequest from "@hooks/shared/usePostRequest";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./AddParticipants.module.css";

interface AddParticipantsProps {
  assessmentData: CreateAssessmentDetailsSubmission;
  setAssessmentData: (
    key: keyof CreateAssessmentDetailsSubmission,
    value: string | ParticipantsManyToMany[]
  ) => void;
  assessmentErrors: CreateAssessmentDetailsSubmission;
  setAssessmentErrors: (
    key: keyof CreateAssessmentDetailsSubmission,
    value: string
  ) => void;
}

const AddParticipants = ({
  assessmentData,
  setAssessmentData,
  assessmentErrors,
  setAssessmentErrors,
}: AddParticipantsProps) => {
  const CREATE_ASSESSMENT_EVENT_URL = "/assessment/assessment-event/create/";
  const ADD_PARTICIPANTS_URL = "/assessment/assessment-event/add-participant/";

  const [assesseeEmail, setAssesseeEmail] = useState("");
  const [assessorEmail, setAssessorEmail] = useState("");

  const router = useRouter();

  const {
    data: createAssessmentData,
    error: createAssessmentError,
    postData: createAssessmentPost,
  } = usePostRequest<CreateAssessmentDetailsSubmission, AssessmentEvent>(
    CREATE_ASSESSMENT_EVENT_URL,
    {
      requiresToken: true,
    }
  );

  const {
    data: addParticipantData,
    error: addParticipantError,
    postData: addParticipantPost,
  } = usePostRequest<AddParticipantsRequest, unknown>(ADD_PARTICIPANTS_URL, {
    requiresToken: true,
  });

  useEffect(() => {
    if (createAssessmentData == null) return;

    console.log(assessmentData.list_of_participants);

    addParticipantPost!({
      list_of_participants: assessmentData.list_of_participants,
      assessment_event_id: createAssessmentData.event_id,
    });
    // eslint-disable-next-line
  }, [createAssessmentData]);

  useEffect(() => {
    console.log(createAssessmentError);
  }, [createAssessmentError]);

  useEffect(() => {
    if (addParticipantData == null) return;
    router.push("/");

  }, [addParticipantData, router]);

  return (
    <div className={styles["name-form"]} data-testid="add-part">
      <h2 className={styles["form__heading"]}>Add Participants</h2>
      <div>
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            setAssessmentData("list_of_participants", [
              {
                assessee_email: assesseeEmail,
                assessor_email: assessorEmail,
              },
            ]);
            createAssessmentPost!(assessmentData);
          }}
        >
          <InputField
            label="Assessee Email"
            onChange={(e) => setAssesseeEmail(e.target.value)}
            value={assesseeEmail}
          />
          <InputField
            label="Assessor Email"
            onChange={(e) => setAssessorEmail(e.target.value)}
            value={assessorEmail}
          />
          <Button type="submit" variant="primary">
            <h2>Submit</h2>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipants;
