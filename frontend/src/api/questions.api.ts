import { fetchAPI } from './client';
import type { CreateQuestionInput, Question } from './types';

export const questionsAPI = {
  getQuestion: (id: string) => fetchAPI<Question>(`/questions/${id}`),

  listQuestions: (params?: { page?: number; limit?: number }) => {
    const query = params ? `?page=${params.page || 1}&limit=${params.limit || 10}` : '';
    return fetchAPI<Question[]>(`/questions${query}`);
  },

  createQuestion: (data: CreateQuestionInput) =>
    fetchAPI<Question>('/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateQuestion: (id: string, data: Partial<CreateQuestionInput>) =>
    fetchAPI<Question>(`/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteQuestion: (id: string) =>
    fetchAPI<void>(`/questions/${id}`, {
      method: 'DELETE',
    }),
};
