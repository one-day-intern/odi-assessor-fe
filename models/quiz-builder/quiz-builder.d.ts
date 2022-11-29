interface Question {
  id: string;
  prompt?: string;
  points?: number;
}

interface MultipleChoiceQuestion extends Question {
  options: MultipleChoiceQuestionOption[];
}

interface MultipleChoiceQuestionOption {
  id: string;
  content: string;
  correct: boolean;
}

interface EssayQuestion extends Question {
  answerKey: string;
}

type QuizValidationError = Map<string, string[]>

interface QuestionApiRequest {
  prompt: string;
  points: number;
  question_type: "multiple_choice" | "text";
}

interface MultipleChoiceQuestionApiRequest extends QuestionApiRequest {
  answer_options: Omit<MultipleChoiceQuestionOption, "id">[];
}

interface EssayQuestionApiRequest extends QuestionApiRequest {
  answer_key: string;
}

type QuestionTypeApiRequest = MultipleChoiceQuestionApiRequest | EssayQuestionApiRequest;

interface QuizBuilderApiRequest {
  name: string;
  description: string;
  duration_in_minutes: number;
  total_points: number;
  questions: QuestionTypeApiRequest[];
}

interface QuizBuilderHook {
  questions: Question[];
  currentQuestion?: Question;
  addQuestion: () => void;
  removeQuestion: (questionId: string) => void;
  controller: {
    updateQuestionPrompt: (questionId: string, prompt: string) => void;
    updateQuestionPoints: (questionId: string, points: number) => void;
    updateQuestionAnswerKey: (questionId: string, answerKey: string) => void;
    updateQuestionOptions: (
      questionId: string,
      action: UPDATE_ACTIONS,
      option?: MultipleChoiceQuestionOption
    ) => void;
    setCurrentQuestionType: (type: "mcq" | "essay") => void;
    setCurrentQuestion: (questionId: string) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
  };
  meta: {
    currentQuestionId?: string;
    errors: QuizValidationError;
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    validateQuiz: () => void;
  };
}
