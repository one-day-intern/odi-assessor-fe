import { Button } from "@components/shared/elements/Button";
import { Loader } from "@components/shared/elements/Loader";
import { InputField } from "@components/shared/forms/InputField";
import { CreateIcon } from "@components/shared/svg/CreateIcon";
import TrashIcon from "@components/shared/svg/TrashIcon";
import React, { ReactNode } from "react";
import styles from "./CreateResponseForm.module.css";

interface CreateResponseItem {
  message: string;
  name: string;
  subject: string;
}

type CreateResponseError = {
  [P in keyof CreateResponseItem]: string;
};

interface Props {
  data: CreateResponseItem;
  error: CreateResponseError;
  setDataValue: (key: keyof CreateResponseItem, value: string) => void;
  status: string;
  children: ReactNode;
  submitHandler: React.FormEventHandler;
}

const CreateResponseForm = ({
  data,
  error,
  setDataValue,
  status,
  children,
  submitHandler,
}: Props) => {
  return (
    <div className={styles["response-form"]} data-testid="response-form">
      <h2 className={styles["response-form__heading"]}>New Response Test</h2>

      <form className={styles["form"]} onSubmit={submitHandler}>
        <InputField
          label="Name *"
          value={data.name}
          onChange={(e) => setDataValue("name", e.target.value)}
          error={error.name}
        />

        <div className={styles["form--divider"]}></div>

        <div>
          <p className={styles["form__input--label"]}>Subject</p>
          <div className={styles["form__input--wrapper"]}>
            <input
              className={styles["form__input"]}
              value={data.subject}
              onChange={(e) => setDataValue("subject", e.target.value)}
            />
          </div>
          <p className={styles["form__error"]}>{error.subject}</p>
        </div>

        {children}

        <div className={styles["form--div"]}>
          <Button
            type="button"
            variant="danger"
            style={{ width: "fit-content", padding: "0.5rem 2rem" }}
          >
            <TrashIcon color="white" height={15} width={15} />
            <p>Cancel</p>
          </Button>
          <Button
            disabled={
              data.message === "" ||
              data.subject === "" ||
              data.name === "" ||
              status === "loading"
            }
            type="submit"
            variant="secondary"
            style={{ width: "fit-content", padding: "0.5rem 2rem" }}
          >
            {status === "loading" ? (
              <Loader />
            ) : (
              <>
                <p>Create</p>
                <CreateIcon color="white" height={15} width={15} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateResponseForm;
