import { useState } from "react";

interface ParticipantsManyToMany {
    assessee_email: string;
    assessor_email: string;

}

interface CreateAssessmentDetailsSubmission {
    name: string;
    start_date: string;
    test_flow_id: string;
    list_of_participants: ParticipantsManyToMany[];
}

const initialState = {
    name: "",
    start_date: "",
    test_flow_id: "",
    list_of_participants: []
}

const useCreateAssessmentEventDetails = () => {
    const [assessmentEventDetails, setAssessmentEventDetails] = useState<CreateAssessmentDetailsSubmission>(initialState);
    const [assessmentEventErrors, setAssessmentEventErrors] = useState<CreateAssessmentDetailsSubmission>(initialState);

    const setAssessmentData = (key: keyof CreateAssessmentDetailsSubmission, value: string | ParticipantsManyToMany) => {
        setAssessmentEventDetails(prev => ({
            ...prev,
            [key]: (key === "list_of_participants") ? [...prev.list_of_participants, value] : value
        }))
    };

    const setAssessmentErrors = (key: keyof CreateAssessmentDetailsSubmission, value: string) => {
        setAssessmentEventErrors(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return { assessmentData: assessmentEventDetails, setAssessmentData, assessmentErrors: assessmentEventErrors, setAssessmentErrors }
}

export { useCreateAssessmentEventDetails }