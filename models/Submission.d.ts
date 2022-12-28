interface Submission {
  grade: number;
  note?: string;
  submitted_time: string;
  response_test_sender: string;
  response_test_subject: string;
  response_test_prompt: string;
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
