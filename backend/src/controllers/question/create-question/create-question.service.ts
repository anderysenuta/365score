import { getPool } from '../../../services/postgres/postgres.service';
import { insertOptionsQuery, insertQuestionQuery } from './create-question.sql';

type CreateQuestionInput = {
  question: string;
  options: Array<{
    id: number;
    value: string;
    isCorrect: boolean;
  }>;
};

type CreateQuestionOutput = {
  id: number;
  question: string;
  options: Array<{
    id: number;
    value: string;
    isCorrect: boolean;
  }>;
};

export const createQuestionService = async (input: CreateQuestionInput): Promise<CreateQuestionOutput> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const questionResult = await client.query(insertQuestionQuery, [input.question]);
    const questionId = questionResult.rows[0].id;

    const optionsResults = [];
    for (const option of input.options) {
      const optionResult = await client.query(insertOptionsQuery, [questionId, option.value, option.isCorrect]);
      optionsResults.push(optionResult.rows[0]);
    }

    await client.query('COMMIT');

    return {
      id: questionId,
      question: questionResult.rows[0].question_text,
      options: optionsResults.map((opt) => ({
        id: opt.id,
        value: opt.option_value,
        isCorrect: opt.is_correct,
      })),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
