-- USERS table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE QUIZ_STATUS_ENUM AS ENUM ('IN_PROGRESS', 'COMPLETED');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL
);

-- QUESTIONS table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_text TEXT NOT NULL
);

-- QUESTION_OPTIONS table
CREATE TABLE IF NOT EXISTS questions_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id),
  option_value TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- QUIZZES table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  status QUIZ_STATUS_ENUM NOT NULL DEFAULT 'IN_PROGRESS'
);

-- QUIZZES_QUESTION table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id),
  question_id UUID NOT NULL REFERENCES questions(id),
  question_order INTEGER NOT NULL, -- fix question order to render in the same order on FE side (or sort by id)
  UNIQUE(quiz_id, question_id),
  UNIQUE(quiz_id, question_order)
);

-- ANSWERS table
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id),
  question_id UUID NOT NULL REFERENCES questions(id),
  selected_option_id UUID REFERENCES questions_options(id),
  is_correct BOOLEAN, -- NULL = not answered, TRUE = correct, FALSE = incorrect
  UNIQUE(quiz_id, question_id) -- One answer per question per quiz
);
