export const insertQuestionQuery = `
    INSERT INTO questions (question_text)
    VALUES ($1)
    RETURNING id, question_text
`;

export const insertOptionsQuery = `
      INSERT INTO questions_options (question_id, option_value, is_correct)
      VALUES ($1, $2, $3)
      RETURNING id, option_value, is_correct
    `;
