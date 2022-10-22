import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";
import { InputField } from "@components/shared/forms/InputField";
import { PasswordField } from "@components/shared/forms/PasswordField";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { useAssessorSignupStoreContext } from "@context/Signup/AssessorSignupStoreContext";
import React, { FormEventHandler, useEffect, useMemo, useRef } from "react";

import styles from "./AssessorPassword.module.css";

const AssessorPassword = () => {
  const { data, errors, setValue, setError, postResult, loadingStatus } =
    useAssessorSignupStoreContext();
  const { password, confirmed_password: confirmedPassword, email } = data;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);

  const inputRefs = useMemo(
    () => ({
      email: emailRef,
      password: passwordRef,
      confirmed_password: confirmedPasswordRef,
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

  const handleSubmit: FormEventHandler<Element> = (e) => {
    e.preventDefault();
    postResult();
  };

  return (
    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Password</h2>
      <form className={styles["window__form"]} data-testid="form" onSubmit={ handleSubmit }>
        <InputField
          ref={inputRefs.email}
          label="Email Address *"
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
          error={errors.email}
        />
        <PasswordField
          ref={passwordRef}
          label="Password *"
          value={password}
          onChange={(e) => setValue("password", e.target.value)}
          error={errors.password}
        />
        <PasswordField
          ref={confirmedPasswordRef}
          label="Confirm password *"
          value={confirmedPassword}
          onChange={(e) => setValue("confirmed_password", e.target.value)}
          error={errors.confirmed_password}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={loadingStatus === "loading"}
        >
          {loadingStatus === "loading" ? <Loader /> : <h2>Sign Up</h2>}
        </Button>
      </form>
      <SigninNotice />
    </>
  );
};

export { AssessorPassword };
