import { useState } from "react"

const initialState: AssignmentNode = {
    id: "",
    asg: null,
    start_time: "",
    release_time: "",
    position: {
        x: 0,
        y: 0
    }
}

const useCreateToolHandler = () => {
    const [tools, setTools] = useState<AssignmentNode>(initialState);

    const setToolData = (key: keyof AssignmentNode, value: string | AssessmentTool) => {
        setTools(prev => ({
            ...prev,
            [key]: value
        }))
    };

    return {tools, setToolData}
}

export { useCreateToolHandler }