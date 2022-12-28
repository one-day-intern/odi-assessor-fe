import { Button } from "@components/shared/elements/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./AddParticipants.module.css";
import { ParticipationCard } from "../ParticipationCard";
import { AnimatePresence } from "framer-motion";

interface CreateAssessmentDetailsProps {
  addEmptyParticipation: () => void;
  removeParticipation: (participant: ParticipantsManyToMany) => void;
  updateParticipation: (participation: ParticipantsManyToMany) => void;
  assessmentData: CreateAssessmentDetailsSubmission;
  validateParticipationBeforeSubmit: (
    assesseeEmail: string,
    assessorEmail: string
  ) => [
    boolean,
    {
      assessorEmailError: string;
      assesseeEmailError: string;
    }
  ];
  selectStep: (id: number) => void;
  assessorList: AssessorOptions[];
}

const AddParticipants = ({
  addEmptyParticipation,
  removeParticipation,
  updateParticipation,
  assessmentData,
  validateParticipationBeforeSubmit,
  selectStep,
  assessorList
}: CreateAssessmentDetailsProps) => {
  const [isEditing, setEditing] = useState(false);

  return (
    <div className={styles["name-form"]} data-testid="add-part">
      <h2 className={styles["form__heading"]}>Add Participants</h2>
      <div>
        <div className={styles["form__div"]}>
          <Button
            disabled={isEditing}
            type="button"
            onClick={(e: Event) => {
              if (isEditing) return;

              addEmptyParticipation();
              setEditing(true);
            }}
            variant="secondary"
            style={{
              width: "fit-content",
              padding: "0.5rem 3rem",
            }}
          >
            <h2>Add</h2>
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (isEditing) {
                toast.error(
                  "Participants should be saved before reviewing the assessment event",
                  {
                    containerId: "root-toast",
                    position: toast.POSITION.TOP_CENTER,
                  }
                );
                return;
              }

              selectStep(2);
            }}
            variant="primary"
            style={{
              width: "fit-content",
              padding: "0.5rem 3rem",
            }}
          >
            <h2>Next</h2>
          </Button>
        </div>
        <div className={styles["separator"]}></div>

        <div className={styles["participation"]}>
          <AnimatePresence>
            {assessmentData.list_of_participants.map((participation) => (
              <ParticipationCard
              assessorList={assessorList}
                key={participation.id}
                {...participation}
                updateParticipation={updateParticipation}
                removeParticipation={removeParticipation}
                validateParticipation={validateParticipationBeforeSubmit}
                onSave={() => setEditing(false)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AddParticipants;
