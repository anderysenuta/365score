-- USERS table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- QUESTIONS table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL
);

-- QUESTION_OPTIONS table
CREATE TABLE IF NOT EXISTS questions_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  option_value TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false
);

-- QUIZZES table
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- add field to mark quiz completed
);

-- QUIZZES_QUESTION table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id),
  question_id INTEGER NOT NULL REFERENCES questions(id),
  question_order INTEGER NOT NULL, -- fix question order to render in the same order on FE side (or sort by id)
  UNIQUE(quiz_id, question_id),
  UNIQUE(quiz_id, question_order)
);

-- ANSWERS table
CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id),
  question_id INTEGER NOT NULL REFERENCES questions(id),
  selected_option_id INTEGER REFERENCES questions_options(id),
  is_correct BOOLEAN, -- NULL = not answered, TRUE = correct, FALSE = incorrect
  UNIQUE(quiz_id, question_id) -- One answer per question per quiz
);
