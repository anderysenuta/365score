import { fetchAPI } from './client';
import type { Quiz, Answer, SubmitAnswerInput } from './types';

export const quizzesAPI = {
  createQuiz: (userId: number) =>
    fetchAPI<Quiz>('/quizzes', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  getQuiz: (id: string) => fetchAPI<Quiz>(`/quizzes/${id}`),

  submitAnswer: (data: SubmitAnswerInput) =>
    fetchAPI<Answer>('/answers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getQuizResults: (quizId: string) =>
    fetchAPI<{
      quiz: Quiz;
      answers: Answer[];
      score: number;
      total: number;
    }>(`/quizzes/${quizId}/results`),
};