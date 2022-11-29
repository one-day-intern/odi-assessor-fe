import React, { useState } from "react";
import styles from "./QuizBuilderConfirmation.module.css";
import { motion } from "framer-motion";
import MultipleChoice from "../Question/MultipleChoice";
import { Button } from "@components/shared/elements/Button";
import AlertIcon from "@components/shared/svg/AlertIcon";
import { TimeField } from "@components/shared/forms/TimeField";
import { InputField } from "@components/shared/forms/InputField";
import { toast } from "react-toastify";
import usePostRequest from "@hooks/shared/usePostRequest";
import { Loader } from "@components/shared/elements/Loader";
import { quizBuilderPostFormatter } from "@utils/formatters/apiRequestFormatters";
import { useRouter } from "next/router";

interface Props {
  builder: QuizBuilderHook;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const buttonStyles: React.CSSProperties = {
  maxWidth: 150,
  fontSize: "1rem",
  fontWeight: "bold",
  marginLeft: "1rem",
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
};

const QuizBuilderConfirmation: React.FC<Props> = ({ builder, setIsSaving }) => {
  const router = useRouter();
  const [duration, setDuration] = useState("00:00");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { postData, status: postStatus } = usePostRequest<
    QuizBuilderApiRequest,
    Response
  >("/assessment/create/interactive-quiz/", { requiresToken: true });

  const quizSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const durationList = duration.split(":");
    const [hours, minutes] = durationList.map((num) => parseInt(num));
    const durationInMinutes = hours * 60 + minutes;

    if (!name || !duration || !description) {
      if (!name) {
        toast.error("Quiz must have a name!");
      }
      if (!description) {
        toast.error("Quiz must have a description!");
      }
      if (!durationInMinutes) {
        toast.error("Quiz must have a duration!");
      }
      return;
    }
    const data = quizBuilderPostFormatter(
      builder.questions,
      name,
      description,
      durationInMinutes
    );
    const response = postData(data);
    if (response instanceof Error) {
      toast.error(response.message);
      return;
    }
    toast.success("Your quiz was successfully built!");
    router.push("/");
  };

  return (
    <motion.div className={`${styles["quiz-preview"]}`}>
      <motion.form
        onSubmit={quizSubmitHandler}
        className={styles["action-bar"]}
      >
        <InputField
          label="Quiz Name *"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <InputField
          label="Quiz Description *"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <TimeField
          label="Duration *"
          value={duration}
          onChange={(e) => setDuration(e.currentTarget.value)}
        />
        <div
          style={{ height: "100%", display: "flex", alignItems: "flex-end" }}
        >
          <Button
            style={{ ...buttonStyles, marginLeft: 0, width: 120, height: 45 }}
            disabled={builder.meta.errors.size > 0}
            variant="secondary"
            type="submit"
          >
            {postStatus === "loading" ? <Loader /> : "Save"}
          </Button>
        </div>
      </motion.form>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className={styles["question-list"]}
      >
        {builder.questions.map((question, i) => {
          const isMultipleChoice = Object.hasOwn(question, "options");
          const isEssay = Object.hasOwn(question, "answerKey");
          const questionHasErrors = builder.meta.errors.get(question.id);
          return (
            <div className={styles["question-preview"]} key={question.id}>
              <div className={styles["question-header"]}>
                <h1>Question {i + 1}</h1>
                <p className={styles["question-points"]}>
                  Points: <b>{question.points ?? "-"}</b>
                </p>
                <Button
                  onClick={() => {
                    builder.controller.setCurrentQuestion(question.id);
                    setIsSaving(false);
                  }}
                  style={buttonStyles}
                  variant="primary"
                >
                  Edit Question
                </Button>
              </div>
              {questionHasErrors && (
                <div className={styles["question-errors"]}>
                  <div className={styles["question-errors_icon"]}>
                    <AlertIcon color="currentColor" />
                  </div>
                  <p className={styles["question-errors_errors"]}>
                    {builder.meta.errors.get(question.id)!.join(", ")}
                  </p>
                </div>
              )}
              <p className={styles["question-prompt"]}>
                {question.prompt ?? "-"}
              </p>
              {isMultipleChoice && (
                <MultipleChoice
                  options={(question as MultipleChoiceQuestion).options}
                  isPreview
                />
              )}
              {isEssay && (
                <>
                  <p
                    style={{
                      margin: 0,
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    Answer key:
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    {(question as EssayQuestion).answerKey || "-"}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileTap={{ scale: 0.95 }}
        className={styles["back-button"]}
        onClick={() => setIsSaving(false)}
      >
        Back to builder
      </motion.button>
    </motion.div>
  );
};

export default QuizBuilderConfirmation;
