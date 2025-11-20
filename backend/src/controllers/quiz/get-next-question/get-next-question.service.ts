import { getPool } from '../../../services/postgres/postgres.service';
import { QuizStatus } from '../quiz.types.ts';
import { checkQuizExistsQuery, getLastAnsweredOrderQuery, getNextQuestionQuery } from './get-next-question.sql';
import type { NextQuestion } from './get-next-question.types';

export const getNextQuestionService = async (quizId: string): Promise<NextQuestion | null> => {
  const pool = getPool();

  const quizResult = await pool.query<{ id: string; status: string }>(checkQuizExistsQuery, [quizId]);

  if (quizResult.rows.length === 0) {
    throw new Error(`Quiz with id ${quizId} does not exist`);
  }

  const quiz = quizResult.rows[0];

  if (quiz.status === QuizStatus.COMPLETED) {
    throw new Error('Quiz is already completed');
  }

  const lastAnsweredResult = await pool.query<{ last_order: number | null }>(getLastAnsweredOrderQuery, [quizId]);
  const lastOrder = lastAnsweredResult.rows[0]?.last_order || 0;
  const nextOrder = lastOrder + 1;

  const questionResult = await pool.query<NextQuestion>(getNextQuestionQuery, [quizId, nextOrder]);

  if (questionResult.rows.length === 0) {
    return null;
  }

  return questionResult.rows[0];
};
