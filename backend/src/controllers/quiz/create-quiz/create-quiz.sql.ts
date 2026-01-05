export const checkUserExistsQuery = `
    SELECT id FROM users WHERE id = $1
`;

export const checkActiveQuizQuery = `
    SELECT id FROM quizzes WHERE user_id = $1 AND status = 'IN_PROGRESS'
`;

export const insertQuizQuery = `
    INSERT INTO quizzes (user_id)
    VALUES ($1)
    RETURNING *
`;

export const getRandomQuestionsQuery = `
    SELECT id FROM questions ORDER BY RANDOM() LIMIT $1
`;

export const insertQuizQuestionQuery = `
    INSERT INTO quiz_questions (quiz_id, question_id, question_order)
    VALUES ($1, $2, $3)
`;
