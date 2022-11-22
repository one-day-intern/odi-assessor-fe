const quizBuilderPostFormatter = (
  questions: Question[],
  quizName: string,
  quizDescription: string,
  durationInMinutes: number
): QuizBuilderApiRequest => {
  const body: QuizBuilderApiRequest = {
    name: quizName,
    description: quizDescription,
    duration_in_minutes: durationInMinutes,
    questions: [],
    total_points: 0,
  };

  for (let question of questions) {
    const isMultipleChoice = Object.hasOwn(question, "options");
    const isEssay = Object.hasOwn(question, "answerKey");
    body.total_points += question.points!;
    if (isMultipleChoice) {
      const mcq: MultipleChoiceQuestionApiRequest = {
        points: question.points!,
        prompt: question.prompt!,
        question_type: "multiple_choice",
        answer_options: [],
      };
      for (let option of (question as MultipleChoiceQuestion).options) {
        mcq.answer_options.push({ content: option.content, correct: option.correct });
      }
      body.questions.push(mcq);
    } else if (isEssay) {
      const essay: EssayQuestionApiRequest = {
        points: question.points!,
        prompt: question.prompt!,
        question_type: "text",
        answer_key: (question as EssayQuestion).answerKey,
      }
      body.questions.push(essay);
    }
  }

  return body;
};

export { quizBuilderPostFormatter };
