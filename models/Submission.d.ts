interface Submission {
  grade: number;
  note: string;
  submitted_time: string;
}

interface AssignmentSubmission extends Submission {
  filename: string;
}
