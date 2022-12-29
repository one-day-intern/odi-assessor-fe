import ChoiceOption from "@components/features/QuizBuilder/Question/MultipleChoice/ChoiceOption";
import { Loader } from "@components/shared/elements/Loader";
import useGetRequest from "@hooks/shared/useGetRequest";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";
import { Button } from "@components/shared/elements/Button";
import usePostRequest from "@hooks/shared/usePostRequest";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import Select from "react-select";

interface QuizGradeResponse {
  "answer-attempts": (MultipleChoiceQuestionAttempt | TextQuestionAttempt)[];
  grade: number;
  "tool-attempt-id": string;
}

interface QuestionAttempt {
  grade: string;
  "is-answered": boolean;
  "is-correct": boolean | null;
  note: string | null;
  prompt: string;
  "question-attempt-id": string;
  "question-points": string;
  "question-type": "multiple_choice" | "text";
}

interface MultipleChoiceQuestionAttempt extends QuestionAttempt {
  "answer-options": {
    "answer-option-id": string;
    content: string;
    correct: boolean;
  }[];
  "selected-answer-option-id": string;
}

interface TextQuestionAttempt extends QuestionAttempt {
  answer: string | null;
  "answer-key": string;
  "awarded-points": number;
}

const renderQuestionAttempt = (attempt: QuestionAttempt) => {
  if (attempt["question-type"] === "multiple_choice") {
    const mcqAttempt = attempt as MultipleChoiceQuestionAttempt;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {mcqAttempt["answer-options"].map((option) => {
          return (
            <ChoiceOption
              key={option["answer-option-id"]}
              isPreview
              option={{
                content: option.content,
                correct:
                  option["answer-option-id"] ===
                  mcqAttempt["selected-answer-option-id"],
                id: option["answer-option-id"],
              }}
            />
          );
        })}
        <div
          style={{
            backgroundColor: "#a4e4fd",
            color: "#1777ff",
            padding: "1.5rem 1rem",
            borderRadius: 8,
            display: "flex",
            gap: "1rem",
          }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <HiOutlineInformationCircle size={30} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <p style={{ margin: 0 }}>Answer key:</p>
            <strong>
              {
                mcqAttempt["answer-options"].find((option) => option.correct)
                  ?.content
              }
            </strong>
          </div>
        </div>
      </div>
    );
  } else if (attempt["question-type"] === "text") {
    const essayAttempt = attempt as TextQuestionAttempt;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextareaAutosize
          disabled
          value={essayAttempt.answer ?? ""}
          style={{
            width: "100%",
            padding: "1rem",
            font: "inherit",
            resize: "none",
          }}
        />
        <div
          style={{
            backgroundColor: "#a4e4fd",
            color: "#1777ff",
            padding: "1.5rem 1rem",
            borderRadius: 8,
            display: "flex",
            gap: "1rem",
          }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <HiOutlineInformationCircle size={30} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <p style={{ margin: 0 }}>Answer key:</p>
            <strong>{essayAttempt["answer-key"]}</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Attempt: React.FC<{
  attempt: MultipleChoiceQuestionAttempt | TextQuestionAttempt;
  questionNum: number;
}> = ({ attempt, questionNum }) => {
  const router = useRouter();
  const [currAttempt, setCurrAttempt] = useState(attempt);
  const [currentEssayMark, setCurrentEssayMark] = useState({
    value: (currAttempt as TextQuestionAttempt)["awarded-points"],
    label: (currAttempt as TextQuestionAttempt)["awarded-points"],
  });
  const { fetchData: refetchCurrentAttempt, status: getStatus } = useGetRequest<
    MultipleChoiceQuestionAttempt | TextQuestionAttempt
  >(
    `/assessment/review/individual-question/?tool-attempt-id=${router.query["attempt_id"]}&question-attempt-id=${currAttempt["question-attempt-id"]}`,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const { postData, status } = usePostRequest<any, any>(
    `/assessment/grade/individual-question/`,
    {
      requiresToken: true,
    }
  );
  const buttonStyles: React.CSSProperties = {
    fontWeight: "bold",
    width: "fit-content",
    margin: 0,
    minWidth: 150,
    minHeight: 40,
  };
  const markIncorrectButtonStyles = {
    ...buttonStyles,
    background: "rgb(255, 215, 215)",
    color: "red",
  };
  const markCorrectButtonStyles = {
    ...buttonStyles,
    background: "rgb(215, 255, 227)",
    color: "green",
  };

  const markMultipleChoice = async (correct: boolean) => {
    const response = await postData({
      "tool-attempt-id": router.query["attempt_id"],
      "question-attempt-id": currAttempt["question-attempt-id"],
      "selected-option-id": (currAttempt as MultipleChoiceQuestionAttempt)[
        "selected-answer-option-id"
      ],
      is_correct: correct,
    });

    if (response instanceof Error) {
      toast.error(response.message);
      return;
    }
    const refetchedAttempt = await refetchCurrentAttempt();
    if (refetchedAttempt instanceof Error) {
      toast.error(refetchedAttempt.message);
      return;
    }
    setCurrAttempt(refetchedAttempt);
    toast.success("Question marked!");
  };

  const markEssay = async (points: number) => {
    const prevValue = currentEssayMark;
    setCurrentEssayMark({ value: points, label: points });
    const response = await postData({
      "tool-attempt-id": router.query["attempt_id"],
      "question-attempt-id": currAttempt["question-attempt-id"],
      "selected-option-id": (currAttempt as MultipleChoiceQuestionAttempt)[
        "selected-answer-option-id"
      ],
      grade: points,
    });
    if (response instanceof Error) {
      setCurrentEssayMark(prevValue);
      return;
    }
    const refetchedAttempt = await refetchCurrentAttempt();
    if (refetchedAttempt instanceof Error) {
      toast.error(refetchedAttempt.message);
      return;
    }
    setCurrAttempt(refetchedAttempt);
    toast.success("Question marked!");
  };
  return (
    <div key={currAttempt["question-attempt-id"]}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          Question {questionNum + 1}{" "}
          <span style={{ fontWeight: "normal", fontSize: "1.5rem" }}>
            ({currAttempt["question-points"]} points)
          </span>
        </h1>
        {currAttempt["question-type"] === "multiple_choice" && (
          <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
            <Button
              onClick={() => markMultipleChoice(false)}
              style={
                currAttempt["is-correct"]
                  ? markIncorrectButtonStyles
                  : buttonStyles
              }
              disabled={
                !!!currAttempt["is-correct"] ||
                status === "loading" ||
                getStatus === "loading"
              }
            >
              {status === "loading" || getStatus === "loading" ? (
                <Loader />
              ) : (
                <>
                  <RxCrossCircled size={20} />
                  Mark Incorrect
                </>
              )}
            </Button>
            <Button
              onClick={() => markMultipleChoice(true)}
              style={
                !currAttempt["is-correct"]
                  ? markCorrectButtonStyles
                  : buttonStyles
              }
              disabled={
                !!currAttempt["is-correct"] ||
                status === "loading" ||
                getStatus === "loading"
              }
            >
              {status === "loading" || getStatus === "loading" ? (
                <Loader />
              ) : (
                <>
                  <RxCheckCircled size={20} />
                  Mark Correct
                </>
              )}
            </Button>
          </div>
        )}
        {currAttempt["question-type"] === "text" && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div>Awarded points:</div>
            <Select
              onChange={(e) => {
                if (e) markEssay(e.value);
              }}
              value={currentEssayMark}
              options={Array.from(
                Array(parseInt(currAttempt["question-points"]) + 1).keys()
              ).map((point) => ({ value: point, label: point }))}
            />
            <strong>/{currAttempt["question-points"]}</strong>
          </div>
        )}
      </div>
      <p>{currAttempt.prompt}</p>
      <strong style={{ display: "block", margin: "0.5rem 0" }}>
        Assessee&apos;s answer:
      </strong>
      {renderQuestionAttempt(currAttempt)}
    </div>
  );
};

const InteractiveQuizGradingPage: NextPage = () => {
  const router = useRouter();
  const {
    data,
    error,
    fetchData: refetch,
  } = useGetRequest<QuizGradeResponse>(
    `/assessment/review/interactive-quiz/?tool-attempt-id=${router.query["attempt_id"]}`,
    { requiresToken: true }
  );

  if (error) {
    toast.error(error.message);
    return null;
  }

  if (!data) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          color: "var(--primary)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "2rem 12rem",
        backgroundColor: "rgba(217, 175, 217, 0.4)",
        backgroundImage:
          "linear-gradient(0deg,  rgba(217, 175, 217, 0.4) 0%, rgba(151, 217, 225, 0.4) 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: "2rem 3rem",
          background: "white",
          borderRadius: 10,
          gap: "2rem",
        }}
      >
        {data["answer-attempts"].map((attempt, i) => (
          <Attempt
            key={`${attempt["question-attempt-id"]}`}
            attempt={attempt}
            questionNum={i}
          />
        ))}
        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/assessment/${router.query.id}/${router.query.email}`)
          }
          style={{
            maxWidth: 215,
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "1rem",
          }}
        >
          &larr;&nbsp;&nbsp;Back to dashboard
        </Button>
      </div>
    </div>
  );
};

export default InteractiveQuizGradingPage;
