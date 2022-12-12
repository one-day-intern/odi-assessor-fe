interface Submission {
  grade: number;
  note?: string;
  submitted_time: string;
}

interface GradeReportModel {
  tool_name: string;
  tool_description: string;
  is_attempted: boolean;
  grade: number;
  note: string | null;
  type: string;
}

interface AssignmentSubmission extends Submission {
  filename: string;
}

interface ResponseTestSubmission extends Submission {
  subject: string;
  tool_attempt_id: string;
  response: string;
}
