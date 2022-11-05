import { useState } from "react";

const initialLoginStore: LoginFormInputs = {
  email: "",
  password: "",
  remember: false
};

const initialLoginError: LoginElements = {
  email: "",
  password: "",
};

const useLoginHandler = () => {
  const [loginStore, setLoginStore] =
    useState<LoginFormInputs>(initialLoginStore);
  const [loginError, setLoginError] =
    useState<LoginElements>(initialLoginError);

  const setStoreValue = (field: keyof LoginFormInputs, value: string | boolean) => {
    setLoginStore((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setErrorValue = (field: keyof LoginElements, value: string) => {
    setLoginError((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { loginStore, loginError, setStoreValue, setErrorValue };
};

export { useLoginHandler };
