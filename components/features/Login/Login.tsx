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
import { useRouter } from "next/router";
import React, { FormEventHandler, useState, useEffect } from "react";
import { toast } from "react-toastify";

import styles from "./Login.module.css";
import { LoginDivider } from "./LoginDivider";

const LOGIN_CALLBACK_URI_ASSESSOR = process.env.NEXT_PUBLIC_BACKEND_URL! + process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;


interface LoginProps {
  loginUrl: string;
}

interface TokenReturnType {
  access: string;
  refresh: string;
}

const Login = ({ loginUrl }: LoginProps) => {
  const [loading, setLoading] = useState(false);
  const { loginStore, loginError, setStoreValue, setErrorValue } =
    useLoginHandler();

  const { dispatch } = useAuthContext();
  
  const router = useRouter();

  const { postData } = usePostRequest<
    LoginFormInputs,
    TokenReturnType
  >(loginUrl, {
    requiresToken: false,
  });

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const [isEmailValid, emailError] = emailValidator(loginStore.email);
    setErrorValue("email", emailError);
    const [isPasswordValid, passwordError] = emptyValidator(
      loginStore.password
    );
    setErrorValue("password", passwordError);
    if (!isEmailValid || !isPasswordValid) return;
    
    setLoading(true);
    const response = await postData(loginStore);
    if (response instanceof Error) {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }
    const { access, refresh } = response;
    const requestUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    const user = await requestUser.json();
    if (!requestUser.ok) {
      toast.error((requestUser as any).message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }
    dispatch({
      type: AuthDispatchTypes.LOGIN,
      payload: {
        user,
        accessToken: access,
        refreshToken: refresh,
        remember: loginStore.remember,
      },
    });
    toast.success("Login successful!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      containerId: "root-toast",
      autoClose: 2000,
    });
    setLoading(false);
    router.push('/');
  };

  useEffect(() => {
    let errorMessage = localStorage.getItem('googleErrorMessage');
    if (errorMessage != null) {
      errorMessage = errorMessage.replaceAll('\"', '');

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
  
      localStorage.removeItem('googleErrorMessage');
    }
    
  }, [router]);

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
            disabled={loading}
          >
            {loading ? <Loader /> : <h2>Login</h2>}
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

          <GoogleButton onClick={() => {
            window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + LOGIN_CALLBACK_URI_ASSESSOR + '&prompt=consent&response_type=code&client_id=' + CLIENT_ID + '&scope=email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read&access_type=offline';
          }} />
        </form>
      </div>
    </Backdrop>
  );
};

export default Login;
