import { getPool } from '../../../services/postgres/postgres.service';
import type { Quiz } from '../quiz.types.ts';
import { checkActiveQuizQuery, checkUserExistsQuery, getRandomQuestionsQuery, insertQuizQuery, insertQuizQuestionQuery } from './create-quiz.sql';

const QUESTIONS_PER_QUIZ = 100;

export const createQuizService = async (userId: string): Promise<Quiz> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const user = await client.query(checkUserExistsQuery, [userId]);

    if (user.rows.length === 0) {
      throw new Error(`User with id ${userId} does not exist`);
    }

    const activeQuiz = await client.query(checkActiveQuizQuery, [userId]);

    if (activeQuiz.rows.length > 0) {
      throw new Error('User already has an active quiz in progress');
    }

    const quiz = await client.query<Quiz>(insertQuizQuery, [userId]);
    const quizId = quiz.rows[0].id;

    const questions = await client.query<{ id: string }>(getRandomQuestionsQuery, [QUESTIONS_PER_QUIZ]);

    if (questions.rows.length < QUESTIONS_PER_QUIZ) {
      throw new Error(`Not enough questions in database. Required: ${QUESTIONS_PER_QUIZ}, Available: ${questions.rows.length}`);
    }

    for (let i = 0; i < questions.rows.length; i++) {
      await client.query(insertQuizQuestionQuery, [quizId, questions.rows[i].id, i + 1]);
    }

    await client.query('COMMIT');

    return quiz.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
