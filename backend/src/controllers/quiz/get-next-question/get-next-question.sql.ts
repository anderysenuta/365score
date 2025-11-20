export const checkQuizExistsQuery = `
    SELECT id, status FROM quizzes WHERE id = $1
`;

export const getLastAnsweredOrderQuery = `
    SELECT MAX(qq.question_order) as last_order
    FROM answers a
    JOIN quiz_questions qq ON a.question_id = qq.question_id AND a.quiz_id = qq.quiz_id
    WHERE a.quiz_id = $1
`;

export const getNextQuestionQuery = `
    SELECT
        q.id,
        q.question_text,
        qq.question_order,
        json_agg(
            json_build_object(
                'id', qo.id,
                'value', qo.option_value
            )
        ) as options
    FROM quiz_questions qq
    JOIN questions q ON qq.question_id = q.id
    JOIN questions_options qo ON q.id = qo.question_id
    WHERE qq.quiz_id = $1 AND qq.question_order = $2
    GROUP BY q.id, q.question_text, qq.question_order
`;
