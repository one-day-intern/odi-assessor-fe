interface TestFlowElement {
  name: string;
  tool: AssignmentNode[];
}

interface TestFlow {
  test_flow_id: string;
  name: string;
  owning_company_id: string;
  is_usable: boolean;
  tools: AssignmentInstance[];
}
