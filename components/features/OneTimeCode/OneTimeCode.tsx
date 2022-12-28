import { Button } from "@components/shared/elements/Button";
import { InputField } from "@components/shared/forms/InputField";
import usePostRequest from "@hooks/shared/usePostRequest";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./OneTimeCode.module.css";
import { toast } from "react-toastify";
import EmailList from "./EmailList";
import { emailValidator } from "@utils/validators/emailValidator";
import { Loader } from "@components/shared/elements/Loader";

const ONE_TIME_CODE_REQUEST = "/company/one-time-code/generate/";

const OneTimeCode = () => {
  const [assesseeEmail, setAssesseeEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const { data, error, postData, status } = usePostRequest(ONE_TIME_CODE_REQUEST, {
    requiresToken: true,
  });

  const router = useRouter();

  useEffect(() => {
    if (data == null) return;
    toast.success("Email has been sent to assessees");
    router.push("/");
  }, [data, router]);

  useEffect(() => {
    if (error == null) return;
    toast.error(error.message);
  }, [error]);

  const postOneTimeData: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    postData({ assessor_emails: emailList });
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const [isEmailValid, emailError] = emailValidator(assesseeEmail);
    if (!isEmailValid) {
      toast.error(emailError);
      return;
    }

    if (emailList.includes(assesseeEmail)) {
      toast.error("This email has already been added to the list.");
      return;
    }

    setEmailList((prev) => [...prev, assesseeEmail]);
    setAssesseeEmail("");
  };

  return (
    <div className={styles["one-time-code"]} data-testid="otc">
      <form onSubmit={postOneTimeData} className={styles["otc-form"]} data-testid="form">
        <InputField
          label="Assessee email to send"
          value={assesseeEmail}
          onChange={(e) => setAssesseeEmail(e.target.value)}
        />
        <Button disabled={assesseeEmail === ""} type="button" variant="secondary" onClick={onClick}>
          <h2>Add To Email List</h2>
        </Button>
        <Button type="submit" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? <Loader/> : <h2>Generate One Time Code</h2>}
        </Button>
      </form>
      <div className={styles["divider"]}></div>
      <EmailList emailList={emailList} setEmailList={setEmailList}/>
    </div>
  );
};

export default OneTimeCode;
