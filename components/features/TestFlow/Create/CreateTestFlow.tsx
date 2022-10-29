import { Button } from "@components/shared/elements/Button";
import { AddIcon } from "@components/shared/svg/AddIcon";
import { v4 as uuidv4 } from "uuid";
import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Connection,
  Edge,
  EdgeMarkerType,
  MarkerType,
  Node,
  ReactFlowProvider,
} from "reactflow";
import styles from "./CreateTestFlow.module.css";
import FlowEditor from "./FlowEditor";
import { useTestFlowHandler } from "@hooks/TestFlow/useTestFlowHandler";
import { InputField } from "@components/shared/forms/InputField";
import ToolPicker from "./ToolPicker/ToolPicker";
import useCreateToolHandler from "@hooks/TestFlow/useCreateToolHandler";
import { TimeField } from "@components/shared/forms/TimeField";
import { useStack } from "@hooks/shared/useStack";

interface DiagramState {
  assignmentsState: AssignmentNode[];
  connectionState: Connection[];
}

const options: AssignmentOption[] = [
  {
    value: {
      tool_id: `1`,
      name: "Video Conference",
      type: "vidcon",
    },
    label: "Video Conference",
  },
  {
    value: {
      tool_id: `2`,
      name: "Response Test",
      type: "response",
    },
    label: "Response Test",
  },
  {
    value: {
      tool_id: `3`,
      name: "Easy Assignment",
      type: "quiz",
    },
    label: "Easy Assignment",
  },
];

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

const CreateTestFlow = () => {
  const [assignmentEvent, setAssignmentEvent] = useState<AssignmentNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const { tools, setToolData } = useCreateToolHandler();

  const { data, setData } = useTestFlowHandler();

  const { push: historyPush, pop: historyPop } = useStack<DiagramState>();
  const {
    push: redoPush,
    pop: redoPop,
    clear: redoClear,
    isEmpty: redoIsEmpty,
  } = useStack<DiagramState>();

  const handleUndo = useCallback(() => {
    const diagramState: DiagramState = {
      assignmentsState: assignmentEvent,
      connectionState: connections,
    };
    redoPush(diagramState);
    const item = historyPop();
    item?.assignmentsState && setAssignmentEvent(item?.assignmentsState!);
    item?.connectionState && setConnections(item?.connectionState!);
  }, [historyPop, redoPush, assignmentEvent, connections]);

  const handleRedo = useCallback(() => {
    if (redoIsEmpty()) return;

    const diagramState: DiagramState = {
      assignmentsState: assignmentEvent,
      connectionState: connections,
    };

    historyPush(diagramState);
    const item = redoPop();
    item?.assignmentsState && setAssignmentEvent(item?.assignmentsState!);
    item?.connectionState && setConnections(item?.connectionState!);
  }, [historyPush, redoPop, assignmentEvent, connections, redoIsEmpty]);

  // Clear stack when unmounts, precaution
  useEffect(() => {
    const handleKeyBindings = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      if (e.key === "z") {
        handleUndo();
      }
      if (e.key === "y") {
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyBindings);

    return () => {
      window.removeEventListener("keydown", handleKeyBindings);
    };
  }, [handleUndo, handleRedo]);

  const submitAssignment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      tools.asg == null ||
      tools.start_time === "" ||
      tools.release_time === ""
    )
      return;

    historyPush({
      assignmentsState: assignmentEvent,
      connectionState: connections,
    });
    redoClear();

    setAssignmentEvent((prev) => {
      setData("tool", tools);

      const result: AssignmentNode[] = [
        ...prev,
        {
          ...tools!,
          id: uuidv4(),
          position: {
            x: Math.random() * 200,
            y: Math.random() * 200,
          },
        },
      ];
      return result;
    });
  };

  const onNodesDelete = (nodes: Node<AssignmentNode>[]) => {
    const deletedNode = nodes[0];
    const assignmentId = deletedNode.data.id;
    setAssignmentEvent((prev) => prev.filter((asg) => asg.id !== assignmentId));
  };

  const onNodeDragEnd = (e: React.MouseEvent, node: Node, nodes: Node[]) => {
    const movedEvent = assignmentEvent.filter((asg) => asg.id === node.id);
    // To allow delete and less burden on history stack, we don't push if the coordinates are the same
    if (
      node.position.x === movedEvent[0].position.x &&
      node.position.y === movedEvent[0].position.y
    )
      return;

    historyPush({
      assignmentsState: assignmentEvent,
      connectionState: connections,
    });
    redoClear();
    const updatedAsgEvent = assignmentEvent.map((asg) =>
      asg.id === node.id ? { ...asg, position: node.position } : asg
    );
    setAssignmentEvent(updatedAsgEvent);
  };

  const onConnect = (connection: Connection) => {
    const sourceNode = assignmentEvent.filter(
      (asg) => asg.id === connection.source
    )![0];
    const targetNode = assignmentEvent.filter(
      (asg) => asg.id === connection.target
    )![0];

    const sourceTime = sourceNode.release_time;
    const targetTime = targetNode.release_time;

    if (sourceTime > targetTime) {
      setConnections((prev) => [...prev]);
      return;
    }

    historyPush({
      assignmentsState: assignmentEvent,
      connectionState: connections,
    });
    redoClear();
    setConnections((prev) => [...prev, connection]);
  };

  const onEdgesDelete = (edges: Edge[]) => {
    const edge = edges[0];
    historyPush({
      assignmentsState: assignmentEvent,
      connectionState: connections,
    });
    redoClear();
    setConnections((prev) =>
      prev.filter(
        (connection) =>
          connection.source !== edge.source || connection.target !== edge.target
      )
    );
  };

  return (
    <main id="main-content" className={styles["content"]}>
      <div className={styles["content__nav"]}>
        <form onSubmit={submitAssignment} className={styles["content__form"]}>
          <h1>Create Test Flow</h1>
          <InputField
            label="Name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />

          <div className={styles["content__add-assess"]}>
            <ToolPicker
              options={options}
              onChange={(option) => {
                setToolData("asg", option?.value!);
                setToolData("start_time", tools.release_time);
              }}
            />

            <div className={styles["content__nav-two"]}>
              <TimeField
                value={tools.release_time}
                label="Release time"
                onChange={(e) => {
                  setToolData("release_time", e.target.value);
                  if (tools.asg?.type === "response")
                    setToolData("start_time", e.target.value);
                }}
              />
              <TimeField
                value={tools.start_time}
                label="Start time"
                onChange={(e) => setToolData("start_time", e.target.value)}
                min={tools.release_time}
                disabled={tools.asg?.type === "response"}
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              style={{ width: "fit-content", margin: "0.5rem 0" }}
              disabled={
                tools.asg == null ||
                tools.start_time === "" ||
                tools.release_time === ""
              }
            >
              <AddIcon />
              <p>Add Tool</p>
            </Button>
          </div>
        </form>
        <div className={styles["divider"]}></div>
        <Button
          type="button"
          variant="primary"
          disabled={false}
          onClick={() => handleUndo()}
        >
          <h2>Save Flow</h2>
        </Button>
      </div>
      <div className={styles["content__flow"]}>
        <ReactFlowProvider>
          <FlowEditor
            assignment={assignmentEvent}
            connection={connections}
            onNodesDelete={onNodesDelete}
            onNodeDragStop={onNodeDragEnd}
            defaultEdgeOptions={edgeOptions}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
          />
        </ReactFlowProvider>
      </div>
    </main>
  );
};

export default CreateTestFlow;
