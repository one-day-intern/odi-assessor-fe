import { EXTENSIONS } from "@utils/data/fileExtensions";
import { useState } from "react";

interface CreateAssignmentStore {
    name: string;
    description: string;
    duration: string;
    expected_file_format: string;
}

type CreateAssignmentError = {
    [P in keyof CreateAssignmentStore]: string;
}

const initialState: CreateAssignmentStore = {
    name: "",
    description: "",
    duration: "00:00",
    expected_file_format: EXTENSIONS[0].value
};

const initialError: CreateAssignmentError = {
    name: "",
    description: "",
    duration: "",
    expected_file_format: ""
}

const useCreateAssignmentStore = () => {
    const [data, setData] = useState<CreateAssignmentStore>(initialState);
    const [error, setError] = useState<CreateAssignmentError>(initialError);

    const setDataValue = (key: keyof CreateAssignmentStore, value: string | number) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const setErrorValue = (key: keyof CreateAssignmentError, value: string) => {
        setError(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return { assignmentData: data, assignmentError: error, setAssignmentValue: setDataValue, setAssignmentError: setErrorValue }
}

export { useCreateAssignmentStore }