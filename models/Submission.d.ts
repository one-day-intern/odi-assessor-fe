interface Submission {
  grade: number;
  note?: string;
  submitted_time: string;
}

interface AssignmentSubmission extends Submission {
  filename: string;
}

interface ResponseTestSubmission extends Submission {
  subject: string;
  tool_attempt_id: string;
  response: string;
}
