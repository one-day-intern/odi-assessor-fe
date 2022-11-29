interface AssessmentTool {
  assessment_id: string;
  name: string;
  type: string;
}

interface AssignmentInstance {
  id: string;
  asg: AssessmentTool | null;
  release_time: string;
  start_time: string;
}

interface AssignmentNode extends AssignmentInstance {
  position: {
    x: number,
    y: number
  }
}

interface ToolAttempt extends AssessmentTool {
  attempt_id: string | null;
}

interface ToolNode extends ToolAttempt {
  position: {
    x: number,
    y: number
  }
}

interface Assignment {
  assessment_id: string;
  name: string;
  description: string;
  expected_file_format: string;
  duration_in_minutes: number;
  owning_company_id: string;
  owning_company_name: string;
}
