interface Assignment {
  tool_id: string;
  name: string;
  type: string;
}

interface AssignmentInstance {
  id: string;
  asg: Assignment | null;
  release_time: string;
  start_time: string;
}

interface AssignmentNode extends AssignmentInstance {
  position: {
    x: number,
    y: number
  }
}

interface AssignmentEdge {
  
}