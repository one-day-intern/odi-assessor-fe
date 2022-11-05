import { Button } from "@components/shared/elements/Button";
import { InputField } from "@components/shared/forms/InputField";
import usePostRequest from "@hooks/shared/usePostRequest";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./OneTimeCode.module.css";

const ONE_TIME_CODE_REQUEST = "/company/one-time-code/generate/";

const OneTimeCode = () => {
  const [assesseeEmail, setAssesseeEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const { data, error, postData } = usePostRequest(ONE_TIME_CODE_REQUEST, {
    requiresToken: true,
  });

  const router = useRouter();

  useEffect(() => {
    if (data == null) return;

    console.log(data);
  }, [data, router]);

  useEffect(() => {
    if (error == null) return;
    console.log(error);
  }, [error]);

  const postOneTimeData: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    postData!({ assessor_emails: emailList });
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setEmailList((prev) => [...prev, assesseeEmail]);
    setAssesseeEmail("");
  };

  return (
    <div className={styles["one-time-code"]} data-testid="otc">
      <form onSubmit={postOneTimeData}>
        <InputField
          label="Assessee email to send"
          value={assesseeEmail}
          onChange={(e) => setAssesseeEmail(e.target.value)}
        />
        <Button type="submit" variant="primary">
          <h2>Generate One Time Code</h2>
        </Button>
        <Button type="button" variant="secondary" onClick={onClick}>
          <h2>Add To Email List</h2>
        </Button>
      </form>
    </div>
  );
};

export default OneTimeCode;
