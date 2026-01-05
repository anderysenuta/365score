import { getPool } from '../../../services/postgres/postgres.service';
import { QuizStatus } from '../quiz.types';
import {
  checkQuizAndQuestionQuery,
  getCorrectOptionQuery,
  checkOptionBelongsToQuestionQuery,
  insertAnswerQuery,
  checkIfAllQuestionsAnsweredQuery,
  updateQuizStatusQuery,
} from './submit-answer.sql';
import type { SubmitAnswerResponse } from './submit-answer.types';

export const submitAnswerService = async (
  quizId: string,
  questionId: string,
  selectedOptionId: string,
): Promise<SubmitAnswerResponse> => {
  const pool = getPool();

  // 1. Check if quiz exists and question belongs to this quiz
  const quizQuestionResult = await pool.query<{
    quiz_id: string;
    quiz_status: string;
    question_id: string;
  }>(checkQuizAndQuestionQuery, [quizId, questionId]);

  if (quizQuestionResult.rows.length === 0) {
    throw new Error('Quiz or question not found');
  }

  const quizData = quizQuestionResult.rows[0];

  if (quizData.quiz_status === QuizStatus.COMPLETED) {
    throw new Error('Quiz is already completed');
  }

  // 2. Check if selected option belongs to this question
  const optionCheck = await pool.query<{ id: string }>(checkOptionBelongsToQuestionQuery, [
    selectedOptionId,
    questionId,
  ]);

  if (optionCheck.rows.length === 0) {
    throw new Error('Selected option does not belong to this question');
  }

  // 3. Get the correct option for this question
  const correctOptionResult = await pool.query<{ id: string; is_correct: boolean }>(getCorrectOptionQuery, [
    questionId,
  ]);

  if (correctOptionResult.rows.length === 0) {
    throw new Error('No correct answer found for this question');
  }

  const correctOption = correctOptionResult.rows[0];
  const isCorrect = correctOption.id === selectedOptionId;

  // 4. Insert or update the answer
  await pool.query(insertAnswerQuery, [quizId, questionId, selectedOptionId, isCorrect]);

  // 5. Check if all questions have been answered
  const questionsCountResult = await pool.query<{
    total_questions: string;
    answered_questions: string;
  }>(checkIfAllQuestionsAnsweredQuery, [quizId]);

  if (questionsCountResult.rows.length > 0) {
    const { total_questions, answered_questions } = questionsCountResult.rows[0];

    // If all questions are answered, mark quiz as completed
    if (parseInt(total_questions) === parseInt(answered_questions)) {
      await pool.query(updateQuizStatusQuery, [quizId, QuizStatus.COMPLETED]);
    }
  }

  return {
    isCorrect,
    correctOptionId: correctOption.id,
  };
};