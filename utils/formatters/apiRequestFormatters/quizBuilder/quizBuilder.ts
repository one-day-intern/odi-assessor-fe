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

  return body;
};

export { quizBuilderPostFormatter };
