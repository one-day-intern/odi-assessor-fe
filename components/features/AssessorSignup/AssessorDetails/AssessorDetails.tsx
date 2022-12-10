import { InputField } from "@components/shared/forms/InputField";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { useAssessorSignupStoreContext } from "@context/Signup/AssessorSignupStoreContext";
import styles from "./AssessorDetails.module.css";

import React, { FormEventHandler, useEffect, useMemo, useRef } from "react";
import { Button } from "@components/shared/elements/Button";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { PhoneField } from "@components/shared/forms/PhoneField";
import { useAssessorSignupStepContext } from "@context/Signup/AssessorSignupStepContext";
import { phoneParser } from "@utils/formatters/phoneParser";
import { phoneNumberValidator } from "@utils/validators/phoneNumberValidator";
import { LoginDivider } from "@components/features/Login/LoginDivider";
import { GoogleButton } from "@components/shared/elements/GoogleButton";

interface Props {
  googleLogin: () => void;
}

const AssessorDetails = ({ googleLogin }: Props) => {
  const { selectStep, selectedId } = useAssessorSignupStepContext();
  const { data, errors, setValue, setError } = useAssessorSignupStoreContext();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const employeeIdRef = useRef<HTMLInputElement>(null);

  const inputRefs = useMemo(
    () => ({
      first_name: firstNameRef,
      last_name: lastNameRef,
      employee_id: employeeIdRef,
    }),
    []
  );

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error = errors[field as keyof AssessorSignupStoreElements];
      if (error) {
        const elementRef = inputRefs[field as keyof typeof inputRefs];
        elementRef?.current?.focus();
        return;
      }
    }
  }, [errors, inputRefs]);

  const continueNext: FormEventHandler<Element> = (e) => {
    e.preventDefault();

    const [isFirstNameValid, firstNameError] = emptyValidator(data.first_name);
    setError("first_name", firstNameError);

    const [isLastNameValid, lastNameError] = emptyValidator(data.last_name);
    setError("last_name", lastNameError);

    const [isEmployeeIdValid, employeeIdError] = emptyValidator(
      data.employee_id
    );
    setError("employee_id", employeeIdError);

    const parsedPhoneNumber = phoneParser(data.phone_number);
    const [isPhoneNumberValid, phoneNumberError] =
      phoneNumberValidator(parsedPhoneNumber);
    setError("phone_number", phoneNumberError);

    const isValid =
      isFirstNameValid &&
      isLastNameValid &&
      isPhoneNumberValid &&
      isEmployeeIdValid;
    if (!isValid) return;

    selectStep(selectedId + 1);
  };

  return (
    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Details</h2>

      <form
        className={styles["window__form"]}
        data-testid="forms"
        onSubmit={continueNext}
      >
        <InputField
          label="First Name *"
          ref={inputRefs.first_name}
          value={data.first_name}
          onChange={(e) => setValue("first_name", e.target.value)}
          error={errors.first_name}
        />

        <InputField
          label="Last Name *"
          ref={inputRefs.last_name}
          value={data.last_name}
          onChange={(e) => setValue("last_name", e.target.value)}
          error={errors.last_name}
        />

        <InputField
          label="Employee Id *"
          ref={inputRefs.employee_id}
          value={data.employee_id}
          onChange={(e) => setValue("employee_id", e.target.value)}
          error={errors.employee_id}
        />

        <PhoneField
          label="Phone Number *"
          onChange={(value) => setValue("phone_number", value)}
          value={data.phone_number}
          error={errors.phone_number}
        />

        <Button variant="primary" type="submit">
          <h2>Next</h2>
        </Button>
      </form>

      <LoginDivider />
      <div className={styles["google-login"]}>
        <GoogleButton onClick={googleLogin} />
      </div>

      <SigninNotice />
    </>
  );
};

export { AssessorDetails };
