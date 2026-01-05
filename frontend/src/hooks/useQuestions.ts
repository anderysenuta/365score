import { questionsAPI } from '../api/questions.api';
import { useFetch } from './useFetch';
import type { CreateQuestionInput } from '../api/types';

// GET: Get single question
export function useQuestion(id: string) {
  return useFetch(() => questionsAPI.getQuestion(id), { enabled: true });
}

// GET: List questions
export function useQuestions(params?: { page?: number; limit?: number }) {
  return useFetch(() => questionsAPI.listQuestions(params), { enabled: true });
}

// POST: Create question
export function useCreateQuestion() {
  return useFetch((data: CreateQuestionInput) => questionsAPI.createQuestion(data));
}

// PATCH: Update question
export function useUpdateQuestion(id: string) {
  return useFetch((data: Partial<CreateQuestionInput>) => questionsAPI.updateQuestion(id, data));
}

// DELETE: Delete question
export function useDeleteQuestion() {
  return useFetch((id: string) => questionsAPI.deleteQuestion(id));
}