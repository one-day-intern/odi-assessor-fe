import useQuizBuilder, { UPDATE_ACTIONS } from "./useQuizBuilder";
import { renderHook, act } from "@testing-library/react";

describe("useQuizBuilder hook test suite", () => {
  test("test add question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
    });
    expect(result.current.questions.length).toBe(1);
    expect(result.current.currentQuestion).toBe(result.current.questions[0]);
  });
  test("test remove question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    const secondQuestion = result.current.questions[1];
    act(() => {
      result.current.removeQuestion(firstQuestion.id);
    });
    expect(result.current.questions.length).toBe(1);
    expect(result.current.currentQuestion).toBe(secondQuestion);
    act(() => {
      result.current.removeQuestion(secondQuestion.id);
    });
    expect(result.current.questions.length).toBe(0);
    expect(result.current.currentQuestion).toBe(undefined);
    expect(result.current.meta.currentQuestionId).toBe(undefined);
  });
  test("test auto select next question after remove question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    const secondQuestion = result.current.questions[1];
    act(() => {
      result.current.controller.setCurrentQuestion(firstQuestion.id);
    });
    act(() => {
      result.current.removeQuestion(firstQuestion.id);
    });
    expect(result.current.questions.length).toBe(1);
    expect(result.current.currentQuestion).toBe(secondQuestion);
    expect(result.current.meta.currentQuestionId).toBe(secondQuestion.id);
  });
  test("test auto select prev question after remove question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    const secondQuestion = result.current.questions[1];
    act(() => {
      result.current.controller.setCurrentQuestion(secondQuestion.id);
    });
    act(() => {
      result.current.removeQuestion(secondQuestion.id);
    });
    expect(result.current.questions.length).toBe(1);
    expect(result.current.currentQuestion).toBe(firstQuestion);
    expect(result.current.meta.currentQuestionId).toBe(firstQuestion.id);
  });
  test("test next question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    const secondQuestion = result.current.questions[1];
    act(() => {
      result.current.controller.setCurrentQuestion(firstQuestion.id);
    });
    act(() => {
      result.current.controller.nextQuestion();
      result.current.controller.nextQuestion();
    });
    expect(result.current.questions.length).toBe(2);
    expect(result.current.currentQuestion).toBe(secondQuestion);
    expect(result.current.meta.currentQuestionId).toBe(secondQuestion.id);
  });
  test("test prev question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.prevQuestion();
      result.current.controller.prevQuestion();
    });
    expect(result.current.questions.length).toBe(2);
    expect(result.current.currentQuestion).toBe(firstQuestion);
    expect(result.current.meta.currentQuestionId).toBe(firstQuestion.id);
  });
  test("test switch mcq to essay question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.setCurrentQuestion(firstQuestion.id);
    });
    act(() => {
      result.current.controller.setCurrentQuestionType("essay");
    });
    expect(result.current.questions.length).toBe(2);
    expect(
      result.current.currentQuestion?.hasOwnProperty("answerKey")
    ).toBeTruthy();
    expect(result.current.meta.currentQuestionId).toBe(firstQuestion.id);
  });
  test("test switch essay to mcq", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.setCurrentQuestion(firstQuestion.id);
    });
    act(() => {
      result.current.controller.setCurrentQuestionType("essay");
    });
    act(() => {
      result.current.controller.setCurrentQuestionType("mcq");
    });
    expect(result.current.questions.length).toBe(2);
    expect(
      result.current.currentQuestion?.hasOwnProperty("options")
    ).toBeTruthy();
    expect(result.current.meta.currentQuestionId).toBe(firstQuestion.id);
  });
  test("test add option to mcq question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    const firstQuestionNew = result.current.questions[0];
    expect(firstQuestionNew.options.length).toBe(1);
  });
  test("test remove option from mcq question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    const firstQuestionNew = result.current.questions[0];
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.REMOVE,
        firstQuestionNew.options[0]
      );
    });
    const firstQuestionNewRemoved = result.current.questions[0];
    expect(firstQuestionNewRemoved.options.length).toBe(0);
  });
  test("test edit option from mcq question", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    const firstQuestionNew = result.current.questions[0];
    const firstOption = firstQuestionNew.options[0];
    const secondOption = firstQuestionNew.options[1];

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
    expect(firstOption.content).toBe("");
    expect(secondOption.content).toBe("");

    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestionNew.id,
        UPDATE_ACTIONS.UPDATE,
        { id: firstOption.id, content: "Hello World", correct: false }
      );
    });

    const firstOptionNew = result.current.questions[0].options[0];

    expect(firstOptionNew.content).toBe("Hello World");
  });
  test("test edit correct mcq option", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.ADD
      );
    });
    const firstQuestionNew = result.current.questions[0];
    const secondOption = firstQuestionNew.options[1];

    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.UPDATE,
        { id: secondOption.id, content: "Hello World", correct: true }
      );
    });

    const firstOption = result.current.questions[0].options[0];
    const secondOptionNew = result.current.questions[0].options[1];

    expect(firstOption.correct).toBe(false);
    expect(secondOptionNew.correct).toBe(true);

    act(() => {
      result.current.controller.updateQuestionOptions(
        firstQuestion.id,
        UPDATE_ACTIONS.UPDATE,
        { id: firstOption.id, content: "Hello World", correct: true }
      );
    });

    const firstOptionNew = result.current.questions[0].options[0];
    const secondOptionNewNew = result.current.questions[0].options[1];

    expect(firstOptionNew.correct).toBe(true);
    expect(secondOptionNewNew.correct).toBe(false);
  });
  test("test edit question prompt", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    expect(firstQuestion.prompt).toBe(undefined);

    act(() => {
      result.current.controller.updateQuestionPrompt(
        firstQuestion.id,
        "Hello World"
      );
    });
    const firstQuestionNew = result.current.questions[0];

    expect(firstQuestionNew.prompt).toBe("Hello World");
  });
  test("test update question points", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    expect(firstQuestion.prompt).toBe(undefined);

    act(() => {
      result.current.controller.updateQuestionPoints(firstQuestion.id, 5);
    });
    const firstQuestionNew = result.current.questions[0];

    expect(firstQuestionNew.points).toBe(5);
  });
  test("test update question points NaN", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    expect(firstQuestion.prompt).toBe(undefined);

    act(() => {
      result.current.controller.updateQuestionPoints(firstQuestion.id, NaN);
    });
    const firstQuestionNew = result.current.questions[0];

    expect(firstQuestionNew.points).toBe(0);
  });
  test("test update question points negative", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    expect(firstQuestion.prompt).toBe(undefined);

    act(() => {
      result.current.controller.updateQuestionPoints(firstQuestion.id, -1);
    });
    const firstQuestionNew = result.current.questions[0];

    expect(firstQuestionNew.points).toBe(0);
  });
  test("test update question answer key", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    const firstQuestion = result.current.questions[0];
    expect(firstQuestion.prompt).toBe(undefined);

    act(() => {
      result.current.controller.setCurrentQuestionType("essay");
    });

    act(() => {
      result.current.controller.updateQuestionAnswerKey(
        firstQuestion.id,
        "Hello World"
      );
    });
    const firstQuestionNew = result.current.questions[0];

    expect(firstQuestionNew.answerKey).toBe("Hello World");
  });
  test("test validate quiz fail", () => {
    const { result } = renderHook(() => useQuizBuilder());
    act(() => {
      result.current.addQuestion();
      result.current.addQuestion();
    });
    act(() => {
      result.current.controller.updateQuestionPrompt(
        result.current.questions[1].id,
        ""
      );
    });
    act(() => {
      result.current.controller.setCurrentQuestionType("essay");
    });
    act(() => {
      result.current.meta.validateQuiz();
    });
    act(() => {
      result.current.controller.updateQuestionOptions(
        result.current.questions[0].id,
        UPDATE_ACTIONS.ADD
      );
    });
    act(() => {
      result.current.meta.validateQuiz();
    });
    act(() => {
      result.current.controller.updateQuestionOptions(
        result.current.questions[0].id,
        UPDATE_ACTIONS.UPDATE,
        {
          id: result.current.questions[0].options[0].id,
          content: "Hello World",
          correct: true,
        }
      );
    });
    act(() => {
      result.current.meta.validateQuiz();
    });

    const firstQuestion = result.current.questions[0];
    const secondQuestion = result.current.questions[1];

    expect(result.current.meta.errors.get(firstQuestion.id)).toContain(
      "Missing question prompt"
    );
    expect(result.current.meta.errors.get(firstQuestion.id)).toContain(
      "Invalid question point(s)"
    );
    expect(result.current.meta.errors.get(secondQuestion.id)).toContain(
      "Missing question prompt"
    );
    expect(result.current.meta.errors.get(secondQuestion.id)).toContain(
      "Missing question answer key"
    );
  });
});
