import { Button } from "@components/shared/elements/Button";
import { GoogleButton } from "@components/shared/elements/GoogleButton";
import { Loader } from "@components/shared/elements/Loader";
import { Checkbox } from "@components/shared/forms/Checkbox";
import { InputField } from "@components/shared/forms/InputField";
import { PasswordField } from "@components/shared/forms/PasswordField";
import { Backdrop } from "@components/shared/layouts/Backdrop";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { OfficeIllustration } from "@components/shared/svg/OfficeIllustration";
import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useLoginHandler } from "@hooks/Login/useLoginHandler";
import usePostRequest from "@hooks/shared/usePostRequest";
import { emailValidator } from "@utils/validators/emailValidator";
import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { FormEventHandler, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./Login.module.css";
import { LoginDivider } from "./LoginDivider";

interface LoginProps {
  loginUrl: string;
}

interface TokenReturnType {
  access: string;
  refresh: string;
}

const Login = ({ loginUrl }: LoginProps) => {
  const { loginStore, loginError, setStoreValue, setErrorValue } =
    useLoginHandler();

  const { dispatch, user } = useAuthContext();

  const isMounted = useRef(false);

  const { data, error, status, postData } = usePostRequest<
    LoginFormInputs,
    TokenReturnType
  >(loginUrl, {
    requiresToken: false,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (status === "loading" || status === "initial") return;

    if (error != null) {
      toast.error(error.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (data != null) {
      const { access, refresh } = data;
      dispatch({
        type: AuthDispatchTypes.LOGIN,
        payload: {
          user,
          accessToken: access,
          refreshToken: refresh,
          remember: loginStore.remember,
        },
      });

      toast.success("You have logged in succesfully!", {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, status]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const [isEmailValid, emailError] = emailValidator(loginStore.email);
    setErrorValue("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(
      loginStore.password
    );
    setErrorValue("password", passwordError);

    if (!isEmailValid || !isPasswordValid) return;

    postData!(loginStore);
  };

  return (
    <Backdrop>
      <div className={styles["window__illustration"]}>
        <OfficeIllustration />
      </div>
      <div className={styles["window__form-div"]}>
        <OdiLogo />

        <h2 className={styles["window__text--heading"]}>Welcome back!</h2>

        <form className={styles["window__form"]} onSubmit={handleSubmit}>
          <InputField
            label="Email"
            onChange={(e) => setStoreValue("email", e.target.value)}
            value={loginStore.email}
            error={loginError.email}
          />
          <PasswordField
            label="Password"
            onChange={(e) => setStoreValue("password", e.target.value)}
            value={loginStore.password}
            error={loginError.password}
          />
          <Button
            type="submit"
            variant="primary"
            style={{
              margin: "1.25rem 0",
            }}
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : <h2>Login</h2>}
          </Button>
          <div className={styles["form__remember"]}>
            <Checkbox
              label="Remember me"
              isChecked={loginStore.remember}
              setIsChecked={(e) => setStoreValue("remember", e.target.checked)}
            />
            <p className={styles["window__text--blue"]}>Forgot Password</p>
          </div>

          <LoginDivider />

          <GoogleButton onClick={() => {}} />
        </form>
      </div>
    </Backdrop>
  );
};

export default Login;
