interface ParticipantsManyToMany {
  assessee_email: string;
  assessor_email: string;
  isSettled?: boolean;
  readonly id: string;
}

interface CreateAssessmentDetailsSubmission {
  name: string;
  start_date: string;
  test_flow: TestFlow | null;
  list_of_participants: ParticipantsManyToMany[];
}

type CreateAssessmentDetailsErrors = {
  [Property in keyof CreateAssessmentDetailsSubmission] : string;
}

interface AddParticipantsRequest {
  assessment_event_id: string;
  list_of_participants: ParticipantsManyToMany[];
}

interface AssessmentEventChoice {
  event_id: string;
  name: string;
  owning_company_id: string;
  start_date_time: string;
  test_flow_id: string;
}
