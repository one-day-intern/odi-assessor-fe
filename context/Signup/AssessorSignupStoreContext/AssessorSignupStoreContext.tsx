import usePostRequest from "@hooks/shared/usePostRequest";
import { confirmPasswordValidator } from "@utils/validators/confirmPasswordValidator";
import { emailValidator } from "@utils/validators/emailValidator";
import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { phoneParser } from "@utils/formatters/phoneParser";
import { phoneNumberValidator } from "@utils/validators/phoneNumberValidator";

interface AssessorSignupStoreProps {
    children: ReactNode
}

const initialValue: AssessorSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  employee_id: "",
  one_time_code: "",
  email: "",
  password: "",
  confirmed_password: "",
};

const initialErrors: AssessorSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  employee_id: "",
  one_time_code: "",
  email: "",
  password: "",
  confirmed_password: "",
};

const AssessorSignupStoreContext = createContext(
  {} as AssessorSignupStoreState
);

const ASSESSOR_SIGNUP_URL = "/users/register-assessor/";

const AssessorSignupStoreProvider = ({
  children,
}: AssessorSignupStoreProps) => {
  const [storeState, setStoreState] = useState(initialValue);

  const [storeErrors, setStoreErrors] = useState(initialErrors);

  const isFirstMount = useRef(false);

  const router = useRouter();

  const {
    data: responseData,
    error: responseError,
    postData,
    status
  } = usePostRequest<
    AssessorSignupStoreElements,
    AssessorSignupStoreElements
  >(
    ASSESSOR_SIGNUP_URL,
    {
      requiresToken: false
    }
  );

  useEffect(() => {
    if (!router.isReady) return;

    const oneTimeCode = router.query.code as string;
    setValue("one_time_code", oneTimeCode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
      return;
    }

    if (status === "loading") return;

    if (responseData != null) {
      toast.success("Your new account has been created", {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER
      });

      router.push("/accounts/login/assessor");
      return;
    }

    if (responseError != null) {
      toast.error(responseError.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  }, [responseData, responseError, status, router]);

  const setValue = (name: string, value: string) =>
    setStoreState((prevState) => {
      const result = name === "phone_number" ? phoneParser(value) : value
      return ({
      ...prevState,
      [name]: result,
    })});

  const setError = (name: string, error: string) =>
    setStoreErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

  const validate = (): [boolean, AssessorSignupStoreElements] => {

    const [isFirstNameValid, firstNameError] = emptyValidator(storeState.first_name);
    setError("first_name", firstNameError);

    const [isLastNameValid, lastNameError] = emptyValidator(storeState.last_name);
    setError("last_name", lastNameError);

    const parsedPhoneNumber = phoneParser(storeState.phone_number);
    const [isPhoneNumberValid, phoneNumberError] = phoneNumberValidator(parsedPhoneNumber);
    setError("phone_number", phoneNumberError);

    const [isEmployeeIdValid, employeeIdError] = emptyValidator(storeState.employee_id);
    setError("employee_id", employeeIdError);

    const [isEmailValid, emailError] = emailValidator(storeState.email);
    setError("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(storeState.password);
    setError("password", passwordError);

    const [isConfirmedPasswordValid, confirmedPasswordError] = confirmPasswordValidator(storeState.password, storeState.confirmed_password);
    setError("confirmed_password", confirmedPasswordError);

    const postedData = {
      ...storeState,
      phone_number: parsedPhoneNumber
    }

    
    
    
    return [isFirstNameValid && isLastNameValid && isPhoneNumberValid && isEmployeeIdValid && isEmailValid && isPasswordValid && isConfirmedPasswordValid, postedData];
  }
  
  const postResult = () => {
    const [isValid, postedData] = validate();
    if (!isValid) return;

    postData!(postedData);
  };

  return (
    <AssessorSignupStoreContext.Provider
      value={{
        data: storeState,
        errors: storeErrors,
        setValue,
        setError,
        postResult,
        loadingStatus: status
      }}
    >
      {children}
    </AssessorSignupStoreContext.Provider>
  );
};

export { AssessorSignupStoreProvider, AssessorSignupStoreContext };
