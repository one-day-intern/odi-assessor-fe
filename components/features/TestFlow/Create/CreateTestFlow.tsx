import { Button } from "@components/shared/elements/Button";
import { AddIcon } from "@components/shared/svg/AddIcon";
import { v4 as uuidv4 } from "uuid";
import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Connection,
  Edge,
  MarkerType,
  Node,
  ReactFlowProvider,
} from "reactflow";
import styles from "./CreateTestFlow.module.css";
import FlowEditor from "./FlowEditor";
import { InputField } from "@components/shared/forms/InputField";
import ToolPicker from "./ToolPicker/ToolPicker";
import useCreateToolHandler from "@hooks/TestFlow/useCreateToolHandler";
import { TimeField } from "@components/shared/forms/TimeField";
import { useStack } from "@hooks/shared/useStack";
import usePostRequest from "@hooks/shared/usePostRequest";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { timeParser } from "@utils/formatters/timeParser";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface DiagramState {
  assignmentsState: AssignmentNode[];
  connectionState: Connection[];
}

interface TestFlowAssignmentFormat {
  tool_id: string;
  release_time: string;
  start_working_time: string;
}

interface TestFlowSubmission {
  name: string;
  tools_used: TestFlowAssignmentFormat[];
}

interface CreateTestFlowProps {
  options: AssignmentOption[];
}

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

const TEST_FLOW_CREATE_URL = "/assessment/test-flow/create/";

const CreateTestFlow = ({ options } : CreateTestFlowProps) => {
  const [assignmentEvent, setAssignmentEvent] = useState<AssignmentNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const { tools, setToolData } = useCreateToolHandler();

  const isFirstMount = useRef(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const {
    data: createTestFlowData,
    error: createTestFlowError,
    postData: postTestFlow,
    status: postTestStatus,
  } = usePostRequest<TestFlowSubmission, TestFlow>(TEST_FLOW_CREATE_URL, {
    requiresToken: true,
  });

  const { push: historyPush, pop: historyPop } = useStack<DiagramState>();
  const {
    push: redoPush,
    pop: redoPop,
    clear: redoClear,
    isEmpty: redoIsEmpty,
  } = useStack<DiagramState>();

  const router = useRouter();

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

  useEffect(() => {
    const handleKeyBindings = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;

      if (e.key === "z") {
        e.preventDefault();
        handleUndo();
      }
      if (e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyBindings);

    return () => {
      window.removeEventListener("keydown", handleKeyBindings);
    };
  }, [handleUndo, handleRedo]);

  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
      return;
    }

    if (postTestStatus === "loading") return;

    if (createTestFlowData != null) {
      toast.success("A new test flow has been created.", {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/");
      return;
    }

    if (createTestFlowError != null) {
      toast.error(createTestFlowError.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  }, [createTestFlowData, createTestFlowError, postTestStatus, router]);

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
      const result: AssignmentNode[] = [
        ...prev,
        {
          ...tools!,
          id: uuidv4(),
          position: {
            x: 15,
            y: 15,
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
    setConnections((prev) =>
      prev.filter(
        (connection) =>
          connection.source !== deletedNode.id ||
          connection.target !== deletedNode.id
      )
    );
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

  const convertFromNodesToAsgInstances = (
    listOfAssignmentNodes: AssignmentNode[]
  ) => {
    const listOfAsgInstances: TestFlowAssignmentFormat[] =
      listOfAssignmentNodes.map((asgNode) => ({
        tool_id: asgNode.asg?.assessment_id!,
        release_time: timeParser(asgNode.release_time).toISOString(),
        start_working_time: timeParser(asgNode.start_time).toISOString(),
      }));
    return listOfAsgInstances;
  };

  const clickToCreateTestFlow = () => {
    const [isNameValid, testFlowNameError] = emptyValidator(name);
    setNameError(testFlowNameError);
    if (!isNameValid) return;

    const dataToBePosted: TestFlowSubmission = {
      name,
      tools_used: convertFromNodesToAsgInstances(assignmentEvent),
    };

    postTestFlow!(dataToBePosted);
  };

  return (
    <main id="main-content" className={styles["content"]}>
      <div className={styles["content__nav"]}>
        <form onSubmit={submitAssignment} className={styles["content__form"]}>
          <h1>Create Test Flow</h1>
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
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
                  if (tools.asg?.type === "responsetest")
                    setToolData("start_time", e.target.value);
                }}
              />

              <TimeField
                value={tools.start_time}
                label="Start time"
                onChange={(e) => setToolData("start_time", e.target.value)}
                min={tools.release_time}
                disabled={tools.asg?.type === "responsetest"}
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
          onClick={clickToCreateTestFlow}
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
