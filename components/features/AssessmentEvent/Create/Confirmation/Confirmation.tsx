import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";
import usePostRequest from "@hooks/shared/usePostRequest";
import { dateFormatter } from "@utils/formatters/dateFormatter";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { ParticipationCard } from "../ParticipationCard";
import styles from "./Confirmation.module.css";

interface AssessmentEventSubmission {
  name: string;
  start_date: string;
  test_flow_id: string;
}

interface AddParticipantsSubmission {
  assessment_event_id: string;
  list_of_participants: ParticipantsManyToMany[];
}

const ASSESSMENT_EVENT_CREATE_URL = "/assessment/assessment-event/create/";
const ASSESSMENT_ADD_PARTICIPANT_URL =
  "/assessment/assessment-event/add-participant/";

const Confirmation = ({
  name,
  start_date,
  test_flow,
  list_of_participants,
}: CreateAssessmentDetailsSubmission) => {
  const formattedDate = dateFormatter(new Date(start_date), {
    isConditional: false,
    returnsComplete: true,
  });

  const router = useRouter();

  const { status: createStatus, postData: postCreateAssessment } =
    usePostRequest<AssessmentEventSubmission, AssessmentEvent>(
      ASSESSMENT_EVENT_CREATE_URL,
      {
        requiresToken: true,
      }
    );

  const { status: assignStatus, postData: postAssignAssessment } =
    usePostRequest<AddParticipantsSubmission, { message: string }>(
      ASSESSMENT_ADD_PARTICIPANT_URL,
      {
        requiresToken: true,
      }
    );

  const handleConfirm = async () => {
    const assessmentSubmission: AssessmentEventSubmission = {
      name,
      start_date,
      test_flow_id: test_flow?.test_flow_id!,
    };

    const responseFromCreation = await postCreateAssessment(
      assessmentSubmission
    );

    if (responseFromCreation instanceof Error) {
      toast.error(responseFromCreation.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const assessmentEventId = responseFromCreation.event_id;
    const assignAssessmentSubmission: AddParticipantsSubmission = {
      assessment_event_id: assessmentEventId,
      list_of_participants,
    };

    const responseFromAssigning = await postAssignAssessment(
      assignAssessmentSubmission
    );

    if (responseFromAssigning instanceof Error) {
      toast.error("Participants unsuccesfully assigned.", {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    toast.success("Assessment event successfully created.", {
      containerId: "root-toast",
      position: toast.POSITION.TOP_CENTER,
    });
    router.push("/");
  };

  return (
    <div className={styles["confirm"]} data-testid="confirm">
      <h2 className={styles["confirm__heading"]}>{name}</h2>
      <div className={styles["confirm__section"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#3d65d8"
          width={20}
          height={20}
        >
          <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
        </svg>
        <p className={styles["confirm__section__text"]}>{formattedDate}</p>
      </div>
      <div className={styles["confirm__section--vertical"]}>
        <p className={styles["confirm__section__label"]}>Test Flow Used: </p>
        <p className={styles["confirm__section__highlight"]}>
          {test_flow?.name}
        </p>
      </div>
      <div className={styles["confirm__section--vertical"]}>
        <p className={styles["confirm__section__label"]}>
          List of Assessment Participants:{" "}
        </p>
        <div className={styles["participation-list"]}>
          {list_of_participants.map((participant) => (
            <ParticipationCard {...participant} key={participant.id} isStatic />
          ))}
        </div>
      </div>
      <Button
        onClick={handleConfirm}
        type="button"
        variant="primary"
        disabled={assignStatus === "loading" || createStatus === "loading"}
      >
        {assignStatus === "loading" || createStatus === "loading" ? (
          <Loader />
        ) : (
          <h2>Create Assessment Event</h2>
        )}
      </Button>
    </div>
  );
};

export default Confirmation;
