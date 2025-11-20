// Common API types

export type Question = {
  id: number;
  question: string;
  options: Array<{
    id: number;
    value: string;
    isCorrect: boolean;
  }>;
};

export type User = {
  id: number;
  name: string;
};

export type Quiz = {
  id: number;
  userId: number;
  startedAt: string;
  completedAt?: string;
};

export type Answer = {
  id: number;
  quizId: number;
  questionId: number;
  selectedOptionId: number;
  isCorrect: boolean;
};

export type CreateQuestionInput = {
  question: string;
  options: Array<{
    value: string;
    isCorrect: boolean;
  }>;
};

export type CreateUserInput = {
  name: string;
};

export type SubmitAnswerInput = {
  quizId: number;
  questionId: number;
  selectedOptionId: number;
};