import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  name: "",
  start_date: "",
  test_flow: null,
  list_of_participants: [] as ParticipantsManyToMany[],
};

const initialError = {
  name: "",
  start_date: "",
  test_flow: "",
  list_of_participants: "",
};

const useCreateAssessmentEventDetails = () => {
  const [assessmentEventDetails, setAssessmentEventDetails] =
    useState<CreateAssessmentDetailsSubmission>(initialState);
  const [assessmentEventErrors, setAssessmentEventErrors] =
    useState<CreateAssessmentDetailsErrors>(initialError);

  const setAssessmentData = (
    key: Omit<keyof CreateAssessmentDetailsSubmission, "list_of_participants">,
    value: string | ParticipantsManyToMany | TestFlow
  ) => {
    setAssessmentEventDetails((prev) => ({
      ...prev,
      [key as keyof CreateAssessmentDetailsSubmission]: value,
    }));
  };

  const validateParticipationBeforeSubmit = (
    assesseeEmail: string,
    assessorEmail: string
  ): [
    boolean,
    {
      assesseeEmailError: string;
      assessorEmailError: string;
    }
  ] => {
    const errors = {
      assesseeEmailError: "",
      assessorEmailError: "",
    };
    const assesseeWithSameEmailExists = (
      assessmentEventDetails.list_of_participants as ParticipantsManyToMany[]
    ).some((participant) => participant.assessee_email === assesseeEmail);
    const assessorWithSameEmailExists = (
      assessmentEventDetails.list_of_participants as ParticipantsManyToMany[]
    ).some((participant) => participant.assessor_email === assessorEmail);

    if (assesseeWithSameEmailExists)
      errors.assesseeEmailError =
        "The assessee has already been assigned to this assessment event.";
    if (assessorWithSameEmailExists)
      errors.assessorEmailError =
        "The assessor has already been assigned to this assessment event.";

    return [
      !assesseeWithSameEmailExists && !assessorWithSameEmailExists,
      errors,
    ];
  };

  const addEmptyParticipation = () => {
    setAssessmentEventDetails((prev) => ({
      ...prev,
      list_of_participants: [
        { id: uuidv4() } as ParticipantsManyToMany,
        ...prev.list_of_participants,
      ],
    }));
  };

  const updateParticipation = (participation: ParticipantsManyToMany) => {
    setAssessmentEventDetails((prev) => ({
      ...prev,
      list_of_participants: prev.list_of_participants.map((participant) =>
        participation.id === participant.id ? participation : participant
      ),
    }));
  };

  const removeParticipation = (participant: ParticipantsManyToMany) => {
    setAssessmentEventDetails((prev) => ({
      ...prev,
      list_of_participants: prev.list_of_participants.filter(
        (participants) => participants.id !== participant.id
      ),
    }));
  };

  const setAssessmentErrors = (
    key: keyof CreateAssessmentDetailsSubmission,
    value: string
  ) => {
    setAssessmentEventErrors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    assessmentData: assessmentEventDetails,
    setAssessmentData,
    assessmentErrors: assessmentEventErrors,
    setAssessmentErrors,
    removeParticipation,
    addEmptyParticipation,
    updateParticipation,
    validateParticipationBeforeSubmit,
  };
};

export { useCreateAssessmentEventDetails };
