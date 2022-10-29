import React, { useEffect } from "react";
import {
  Connection,
  DefaultEdgeOptions,
  Edge,
  Node,
  NodeDragHandler,
  ReactFlow,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import { AssignmentCard } from "./AssignmentCard";

interface FlowEditorProps {
  assignment: AssignmentNode[];
  onNodesDelete?: (nodes: Node[]) => void;
  onNodeDragStop?: NodeDragHandler;
  onConnect?: (connection: Connection) => void;
  onEdgesDelete?: (edges: Edge[]) => void;
  connection: Connection[];
  defaultEdgeOptions: DefaultEdgeOptions;
}

const NODE_TYPES = {
  assignment: AssignmentCard,
};

const nodifyAssignment = (assignment: AssignmentNode): Node => {
  const { id, asg, release_time, start_time, position } = assignment!;
  const { x, y } = position;
  const newNode: Node = {
    id: id!,
    data: {
      label: <AssignmentCard data={assignment!} />,
      id,
      asg,
      release_time,
      start_time,
    },
    type: "assignment",
    position: {
      x,
      y,
    },
  };
  return newNode;
};

const edgifyConnections = (connections: Connection[], realEdges: Edge[]): Edge[] => {
    const connectionEdges = connections as Edge[];

    for (let i = 0; i < connectionEdges.length; i++) {
      const edge = connectionEdges[i];
      const foundEdgeList = realEdges.filter(
        (found) => found.source === edge.source && found.target === edge.target
      );

      let foundEdge: Edge;
      if (foundEdgeList.length !== 0) {
        foundEdge = foundEdgeList[0];
        connectionEdges[i] = foundEdge;
      }
    }

    return connectionEdges;
}

const FlowEditor = ({
  assignment,
  onNodesDelete,
  onNodeDragStop,
  defaultEdgeOptions,
  onConnect,
  connection,
  onEdgesDelete,
}: FlowEditorProps) => {
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (assignment.length === 0) {
      reactFlowInstance.setNodes([]);
      return;
    }

    const noOfNodes = reactFlowInstance.getNodes().length;

    if (assignment.length <= noOfNodes) {
      const nodifiedAssignments = assignment.map((asg) =>
        nodifyAssignment(asg)
      );
      reactFlowInstance.setNodes(nodifiedAssignments);

      return;
    }

    const newAssignment = assignment.at(-1);
    const newNode = nodifyAssignment(newAssignment!);

    reactFlowInstance.addNodes(newNode);

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignment]);

  useEffect(() => {
    const realEdges = reactFlowInstance.getEdges();
    const edgeList = edgifyConnections(connection, realEdges)

    reactFlowInstance.setEdges(edgeList);
    console.log({connection, realEdges})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  return (
    <ReactFlow
      defaultNodes={[]}
      defaultEdges={[]}
      fitView
      nodeTypes={NODE_TYPES}
      onConnect={onConnect}
      onNodesDelete={onNodesDelete}
      onNodeDragStop={onNodeDragStop}
      onEdgesDelete={onEdgesDelete}
      defaultEdgeOptions={defaultEdgeOptions}
    />
  );
};

export default FlowEditor;
