import { StatusCodes } from 'http-status-codes';
import type { ControllerEvent, ControllerResponse } from '../../../utils/router/router';
import { validateSchema } from '../../../utils/validateSchema/validateSchema';
import type { Quiz } from '../quiz.types.ts';
import { createQuizService } from './create-quiz.service';
import createQuizBodyShema from './create-quiz.shema.ts';

const validateBodySchema = validateSchema(createQuizBodyShema);

type CreateQuizBody = {
  userId: string;
};

const createQuizController = async (event: ControllerEvent<CreateQuizBody>): Promise<ControllerResponse<Quiz | { error: string }>> => {
  if (!validateBodySchema(event.body)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid request body' },
    };
  }

  const { userId } = event.body;

  const quiz = await createQuizService(userId);

  return {
    statusCode: StatusCodes.CREATED,
    body: quiz,
  };
};

export default createQuizController;
