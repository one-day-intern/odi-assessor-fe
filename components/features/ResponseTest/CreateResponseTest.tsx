import { TextEditor } from "@components/shared/forms/TextEditor";
import { Backdrop } from "@components/shared/layouts/Backdrop";
import { MultistepIndex } from "@components/shared/layouts/MultistepAssignment";
import { useCreateResponseForm } from "@hooks/CreateResponseForm";
import React from "react";
import { CreateResponseForm } from "./CreateResponseForm";
import styles from "./CreateResponseTest.module.css";

interface Props {
  onSubmit: (message: string, subject: string, name: string) => void;
  status: string;
}

const CreateResponseTest = ({ onSubmit, status }: Props) => {
  const { data, error, setDataValue, validate } = useCreateResponseForm();

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    onSubmit(data.message, data.subject, data.name);
  };

  return (
    <>
      <Backdrop />
      <div className={styles["response-test"]}>
        <MultistepIndex
          currentStepId={0}
          setCurrentStepId={() => {}}
          steps={[]}
        />

        <CreateResponseForm
          submitHandler={submitHandler}
          data={data}
          error={error}
          setDataValue={setDataValue}
          status={status}
        >
          <TextEditor
            error={error.message}
            value={data.message}
            onChange={(content: string) => {
              setDataValue("message", content);
            }}
          />
        </CreateResponseForm>
      </div>
    </>
  );
};

export default CreateResponseTest;
