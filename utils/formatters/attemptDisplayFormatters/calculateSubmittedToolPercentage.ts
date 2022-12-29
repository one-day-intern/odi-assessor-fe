const calculateSubmittedToolPercentage = (tools: ToolAttempt[]): number => {

  const noOfToolsWithAttempts = tools?.filter(
    (tool) => tool.attempt_id != null
  )?.length;
  return (noOfToolsWithAttempts / tools?.length ?? 1) * 100;
};

export default calculateSubmittedToolPercentage;