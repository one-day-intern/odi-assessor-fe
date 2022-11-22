import { quizBuilderPostFormatter } from "./quizBuilder";
import { v4 as uuid } from "uuid";

describe("quiz builder api formatter utils test suite", () => {
  test("test correct post request formatting", () => {
    const mcq = {
      id: uuid(),
      prompt: "This is a multiple choice question",
      points: 5,
      options: [],
    };
    const mcqOptions = [{ id: uuid(), content: "An Option", correct: true }];
    // @ts-ignore
    mcq.options.push(mcqOptions);
    const essay = {
      id: uuid(),
      prompt: "This is a text question",
      points: 10,
      answerKey: "An Answer Key",
    };
    const questions = [mcq, essay];
    const quizName = "A quiz name";
    const quizDescription = "A quiz description";
    const quizDurationInMinutes = 60;

    const formattedResult = quizBuilderPostFormatter(questions, quizName, quizDescription, quizDurationInMinutes);

    expect(formattedResult.name).toBe("A quiz name");
    expect(formattedResult.description).toBe("A quiz description");
    expect(formattedResult.duration_in_minutes).toBe(60)
    expect(formattedResult.total_points).toBe(15);
    expect(formattedResult.questions.length).toBe(2);
  });
});
