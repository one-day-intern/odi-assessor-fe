interface AssessorSignupStoreState {
    data: AssesseeSignupStoreElements;
    errors: AssesseeSignupStoreElements;
    setValue: (name: string, value: string) => void;
    setError: (name: string, value: string) => void;
    postResult: () => void;
    loadingStatus?: "loading" | "fetched" | "initial" | "error"
}

interface AssessorSignupStoreElements {
    email: string;
    password: string;
    confirmed_password: string;
    first_name: string;
    last_name: string;
    employee_id: string;
    phone_number: string;
    one_time_code: string;
}