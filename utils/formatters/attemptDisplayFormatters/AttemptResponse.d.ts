interface AttemptResponse {
  "attempt-id": string | null;
  start_working_time: string;
  "tool-data": AssessmentTool;
}
