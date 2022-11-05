import { Button } from "@components/shared/elements/Button";
import { InputField } from "@components/shared/forms/InputField";
import React, { useState } from "react";
import styles from "./ParticipationCard.module.css";

interface ParticipationCardProps extends ParticipantsManyToMany {
  updateParticipation?: (participation: ParticipantsManyToMany) => void;
  removeParticipation?: (participation: ParticipantsManyToMany) => void;
  validateParticipation?: (
    assesseeEmail: string,
    assessorEmail: string
  ) => [
    boolean,
    {
      assesseeEmailError: string;
      assessorEmailError: string;
    }
  ];
  onSave?: () => void;
  isStatic?: boolean;
}

const ParticipationCard = ({
  updateParticipation,
  assessee_email,
  assessor_email,
  id,
  removeParticipation,
  onSave,
  validateParticipation,
  isSettled,
  isStatic,
}: ParticipationCardProps) => {
  const [participation, setParticipation] = useState<ParticipantsManyToMany>({
    assessee_email,
    assessor_email,
    id,
    isSettled: isSettled ?? false,
  });
  const [errors, setErrors] = useState({
    assesseeEmailError: "",
    assessorEmailError: "",
  });

  const handleSubmission: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const [isValid, errors] = validateParticipation!(
      participation.assessee_email,
      participation.assessor_email
    );
    setErrors(errors);
    if (!isValid) return;

    updateParticipation!({
      ...participation,
      isSettled: true,
    });
    onSave!();
  };

  const setParticipationValue = (
    key: keyof ParticipantsManyToMany,
    value: string
  ) => {
    setParticipation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form data-testid="participation-card" onSubmit={handleSubmission} className={styles["participation-card"]}>
      {isStatic || (
        <button
          className={styles["participation__close"]}
          type="button"
          onClick={() => {
            removeParticipation!(participation);
            onSave!();
          }}
          data-testid="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            height={11}
            width={11}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      )}
      {isSettled || isStatic ? (
        <>
          <p className={styles["participation__text--details"]}>Assessee: </p>
          <p className={styles["participation__text"]}>{assessee_email}</p>
        </>
      ) : (
        <InputField
          value={assessee_email}
          onChange={(e) =>
            setParticipationValue("assessee_email", e.target.value)
          }
          label="Assessee Email"
          error={errors.assesseeEmailError}
        />
      )}
      {isSettled || isStatic ? (
        <>
          <p className={styles["participation__text--details"]}>Assessor: </p>
          <p className={styles["participation__text"]}>{assessor_email}</p>
        </>
      ) : (
        <InputField
          value={assessor_email}
          onChange={(e) =>
            setParticipationValue("assessor_email", e.target.value)
          }
          label="Assesor Email"
          error={errors.assessorEmailError}
        />
      )}
      {isSettled || isStatic || (
        <Button type="submit" variant="primary">
          <p>Add Participation</p>
        </Button>
      )}
    </form>
  );
};

export default ParticipationCard;
