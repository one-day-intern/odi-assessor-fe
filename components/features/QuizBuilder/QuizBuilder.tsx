import React, { useState } from "react";
import styles from "./QuizBuilder.module.css";
import useQuizBuilder, {
  UPDATE_ACTIONS,
} from "@hooks/QuizBuilder/useQuizBuilder";
import Sidebar from "./Sidebar";
import TextareaAutosize from "react-textarea-autosize";
import MultipleChoice from "./Question/MultipleChoice";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import QuestionTypeToggler from "./QuestionTypeToggler";
import QuizBuilderConfirmation from "./QuizBuilderConfirmation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@components/shared/elements/Button";

const nextButtonStyle: React.CSSProperties = {
  maxWidth: 150,
  fontWeight: "bold",
  fontSize: "1.2rem",
  border: "2px solid var(--secondary)",
  background: "var(--secondary)",
  color: "white",
};

const previousButtonStyle: React.CSSProperties = {
  ...nextButtonStyle,
  color: "var(--secondary)",
  background: "white",
};

const disabledNextButtonStyle: React.CSSProperties = {
  ...nextButtonStyle,
  background: "grey",
  border: "2px solid grey",
};

const disabledPreviousButtonStyle: React.CSSProperties = {
  ...previousButtonStyle,
  color: "grey",
  border: "2px solid grey",
};

const QuizBuilder = () => {
  const [isSaving, setIsSaving] = useState(false);
  const builder = useQuizBuilder();
  const currentQuestion = builder.currentQuestion;
  const currentQuestionNumber = builder.questions.findIndex(
    (question) => question.id === builder.currentQuestion?.id
  );
  const currentIsMultipleChoice =
    currentQuestion && Object.hasOwn(currentQuestion, "options");
  const currentIsEssay =
    currentQuestion && Object.hasOwn(currentQuestion, "answerKey");
  const currentType = currentIsEssay ? "essay" : "mcq";
  const currentPoints = currentQuestion && (currentQuestion.points ?? 0);
  const nextQuestionExists = !!builder.questions[currentQuestionNumber + 1];
  const previousQuestionExists = !!builder.questions[currentQuestionNumber - 1];

  return (
    <main className={styles["builder-main"]}>
      <AnimatePresence mode="wait">
        {isSaving && (
          <QuizBuilderConfirmation
            key={"builderConfirmation"}
            builder={builder}
            setIsSaving={setIsSaving}
          />
        )}
        {!isSaving && (
          <React.Fragment key={"builder"}>
            <Sidebar
              builder={builder}
              onSave={() => {
                builder.meta.validateQuiz();
                setIsSaving(true);
              }}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className={styles["builder-body"]}
            >
              <div className={styles["body-container"]}>
                {currentQuestion && (
                  <>
                    <div className={styles["question-header"]}>
                      <h1>Question {currentQuestionNumber + 1}</h1>
                      <div className={styles["question-points_input"]}>
                        <label htmlFor="questionPoints">Points:</label>
                        <input
                          style={{
                            maxWidth: `calc(${
                              currentPoints!.toString().length
                            }ch + 1.6rem)`,
                          }}
                          id="questionPoints"
                          type="number"
                          value={currentPoints?.toString()}
                          onInput={(e) => {
                            builder.controller.updateQuestionPoints(
                              currentQuestion.id,
                              parseInt(e.currentTarget.value, 10)
                            );
                          }}
                        />
                      </div>
                      <QuestionTypeToggler
                        onToggle={(type) =>
                          builder.controller.setCurrentQuestionType(type)
                        }
                        currentType={currentType}
                      />
                    </div>
                    <TextareaAutosize
                      value={currentQuestion.prompt ?? ""}
                      onChange={(e) =>
                        builder.controller.updateQuestionPrompt(
                          currentQuestion.id,
                          e.currentTarget.value
                        )
                      }
                      placeholder={"Click here to type your question.."}
                      className={styles["question-prompt"]}
                    />
                    {currentIsMultipleChoice && (
                      <>
                        {(currentQuestion as MultipleChoiceQuestion).options
                          .length > 0 && (
                          <p
                            style={{
                              margin: 0,
                              color: "grey",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                            }}
                          >
                            Select the correct choice:
                          </p>
                        )}
                        <MultipleChoice
                          options={
                            (currentQuestion as MultipleChoiceQuestion).options
                          }
                          onAddOption={() =>
                            builder.controller.updateQuestionOptions(
                              currentQuestion.id,
                              UPDATE_ACTIONS.ADD
                            )
                          }
                          onEditOption={(option) =>
                            builder.controller.updateQuestionOptions(
                              currentQuestion.id,
                              UPDATE_ACTIONS.UPDATE,
                              option
                            )
                          }
                          onRemoveOption={(option) =>
                            builder.controller.updateQuestionOptions(
                              currentQuestion.id,
                              UPDATE_ACTIONS.REMOVE,
                              option
                            )
                          }
                        />
                      </>
                    )}
                    {currentIsEssay && (
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
                        <TextareaAutosize
                          value={
                            (currentQuestion as EssayQuestion).answerKey ?? ""
                          }
                          onChange={(e) =>
                            builder.controller.updateQuestionAnswerKey(
                              currentQuestion.id,
                              e.currentTarget.value
                            )
                          }
                          placeholder={
                            "Click here to type the answer key to your question.."
                          }
                          className={`${styles["question-answer_key"]} ${styles["question-prompt"]}`}
                        />
                      </>
                    )}
                    <div className={styles["button-container"]}>
                      <Button
                        style={
                          previousQuestionExists
                            ? previousButtonStyle
                            : disabledPreviousButtonStyle
                        }
                        disabled={!previousQuestionExists}
                        onClick={builder.controller.prevQuestion}
                      >
                        Previous
                      </Button>
                      <Button
                        style={
                          nextQuestionExists
                            ? nextButtonStyle
                            : disabledNextButtonStyle
                        }
                        disabled={!nextQuestionExists}
                        onClick={builder.controller.nextQuestion}
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}
                {!currentQuestion && (
                  <div style={{ margin: "auto", opacity: 0.6 }}>
                    <OdiLogo width={300} height={300} />
                    <h1
                      style={{
                        textAlign: "center",
                        fontWeight: "normal",
                        margin: "0.5rem",
                      }}
                    >
                      Quiz Builder
                    </h1>
                  </div>
                )}
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </main>
  );
};

export default QuizBuilder;
