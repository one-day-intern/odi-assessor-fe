interface AssessmentEvent {
  id: string;
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
