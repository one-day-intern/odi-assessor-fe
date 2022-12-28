const attemptifyToolAttempt = (response: AttemptResponse[]): ToolAttempt[] => {
  return response?.map((attempt) => ({
    assessment_id: attempt["tool-data"].assessment_id,
    attempt_id: attempt["attempt-id"],
    name: attempt["tool-data"].name,
    type: attempt.type,
    description: attempt["tool-data"].description
  }));
};
export default attemptifyToolAttempt;
