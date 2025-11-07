import createQuestionController from './controllers/question/create-question/create-question.controller';
import createRouter, { type Route } from './utils/router/router';

const routes: Route[] = [
  // questions routes
  ['POST', '/questions', createQuestionController],
  // ['GET', '/questions/{id}', getQuestionController],
  // ['GET', '/questions', listQuestionController],
  // ['PATCH', '/questions/{id}', updateQuestionController],
  // ['DELETE', '/questions/{id}', deleteQuestionController],

  // users routes
  // ['GET', '/users/{id}', getUserController],
  // ['GET', '/users/{id}/questions/{questionId}', getUserQuestionController],
  // ['GET', '/users', listUserController],
  // ['POST', '/users', createUserController],
  // ['PATCH', '/users/{id}', updateUserController],
  // ['DELETE', '/users/{id}', deleteUserController],
];

export default createRouter(routes);
