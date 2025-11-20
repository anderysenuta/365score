export const checkQuizAndQuestionQuery = `
  SELECT
    q.id as quiz_id,
    q.status as quiz_status,
    qq.question_id
  FROM quizzes q
  INNER JOIN quiz_questions qq ON q.id = qq.quiz_id
  WHERE q.id = $1 AND qq.question_id = $2
`;

export const getCorrectOptionQuery = `
  SELECT id, is_correct
  FROM questions_options
  WHERE question_id = $1 AND is_correct = TRUE
  LIMIT 1
`;

export const checkOptionBelongsToQuestionQuery = `
  SELECT id
  FROM questions_options
  WHERE id = $1 AND question_id = $2
`;

export const insertAnswerQuery = `
  INSERT INTO answers (quiz_id, question_id, selected_option_id, is_correct)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (quiz_id, question_id)
  DO UPDATE SET
    selected_option_id = EXCLUDED.selected_option_id,
    is_correct = EXCLUDED.is_correct
  RETURNING id, is_correct
`;

export const checkIfAllQuestionsAnsweredQuery = `
  SELECT
    COUNT(qq.id) as total_questions,
    COUNT(a.id) as answered_questions
  FROM quiz_questions qq
  LEFT JOIN answers a ON qq.quiz_id = a.quiz_id AND qq.question_id = a.question_id
  WHERE qq.quiz_id = $1
  GROUP BY qq.quiz_id
`;

export const updateQuizStatusQuery = `
  UPDATE quizzes
  SET status = $2
  WHERE id = $1
`;