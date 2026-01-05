import { quizzesAPI } from '../api/quizzes.api';
import type { SubmitAnswerInput } from '../api/types';
import { useFetch } from './useFetch';

// GET: Get quiz
export function useQuiz(id: string) {
  return useFetch(() => quizzesAPI.getQuiz(id), { enabled: true });
}

// GET: Get quiz results
export function useQuizResults(quizId: string) {
  return useFetch(() => quizzesAPI.getQuizResults(quizId), { enabled: true });
}

// POST: Create quiz
export function useCreateQuiz() {
  return useFetch((userId: number) => quizzesAPI.createQuiz(userId));
}

// POST: Submit answer
export function useSubmitAnswer() {
  return useFetch((data: SubmitAnswerInput) => quizzesAPI.submitAnswer(data));
}
