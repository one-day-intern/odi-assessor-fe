import React, { useEffect, useState } from "react";
import { ReactFlow, Node, Edge, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./ParticipationTimeline.module.css";
import { TimelineCard } from "./TimelineCard";

interface Props {
  tools: ToolAttempt[];
}

const nodifyAttempts = (tool: ToolAttempt[]): Node[] => {
    const nodes: Node[] = [];

    let x = 25;
    const y = 70;

    for (let node of tool) {

        const { name, type, attempt_id } = node;
        
        const newNode: Node = {
            id: `${x}`,
            data: {
                label: <TimelineCard data={node} />,
                attempt_id,
                name,
                type,
            },
            type: "timeline",
            position: { x, y },
        };
        nodes.push(newNode);
        x += 300;
    }
     
    return nodes;
};

const edgifyAttempts = (nodes: Node[]): Edge[] => {
  const connectionEdges: Edge[] = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    const currentNode: Node = nodes[i];
    const nextNode: Node = nodes[i+1];

    const edge: Edge = {
      id: `${i}`,
      source: currentNode.id,
      target: nextNode.id
    }

    connectionEdges.push(edge);
  }

  return connectionEdges;
  
}

const NODE_TYPES = {
  timeline: TimelineCard,
};

const edgeOptions = {
  animated: true,
  style: {
    stroke: "white",
    strokeWidth: 3,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "white",
  },
};

const ParticipationTimeline = ({ tools }: Props) => {
  const nodes = nodifyAttempts(tools);
  const edges = edgifyAttempts(nodes);
  return (
    <div className={styles["participation-timeline"]}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={NODE_TYPES} defaultEdgeOptions={edgeOptions}/>
    </div>
  );
};

export default ParticipationTimeline;
