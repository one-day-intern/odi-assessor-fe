interface AssessmentEvent {
  event_id: string;
  name: string;
  numberOfAssesssees: number;
  description: string;
  date: Date;
  duration: Date;
}

interface AssessmentEventParticipation {
  assesseeName: string;
  assesseeEmail: string;
  assessmentEventId: string;
}

interface Assessor {
  email: string;
  first_name: string;
  last_name: string;
}

interface AssessorOptions {
  readonly value: Assessor;
  readonly label: string;
}
