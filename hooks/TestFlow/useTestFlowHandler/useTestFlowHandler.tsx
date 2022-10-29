import { useEffect, useState } from "react";

const initialTestFlow = {
    name: "",
    tool: []
}

const useTestFlowHandler = () => {
    const [testFlowState, setTestFlowState] = useState<TestFlowElement>(initialTestFlow);

    const setData = (key: keyof TestFlowElement, value: string | AssignmentNode) => {
        setTestFlowState(prev => ({
            ...prev,
            [key]: (key === "tool") ? [...prev[key], value] : value
        }))
    }

    return { data: testFlowState, setData }
}

export default useTestFlowHandler;