import createQuestionController from './controllers/question/create-question/create-question.controller';
import createQuizController from './controllers/quiz/create-quiz/create-quiz.controller';
import getNextQuestionController from './controllers/quiz/get-next-question/get-next-question.controller';
import submitAnswerController from './controllers/quiz/submit-answer/submit-answer.controller';
import createUserController from './controllers/user/create-user/create-user.controller';
import createRouter, { type Route } from './utils/router/router';

const routes: Route[] = [
  // questions routes
  ['POST', '/questions', createQuestionController],

  // users routes
  ['POST', '/users', createUserController],

  // quizzes routes
  ['POST', '/quizzes', createQuizController],
  ['GET', '/quizzes/{quizId}/questions/next', getNextQuestionController],
  ['POST', '/quizzes/{quizId}/questions/{questionId}/answer', submitAnswerController],
];

export default createRouter(routes);
