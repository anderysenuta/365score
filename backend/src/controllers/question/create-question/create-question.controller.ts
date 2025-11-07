import { StatusCodes } from 'http-status-codes';
import type { ControllerEvent, ControllerResponse } from '../../../utils/router/router';
import { validateSchema } from '../../../utils/validateSchema/validateSchema';
import createQuestionBodySchema from './create-question.shema';
import { createQuestionService } from './create-question.service';

const validateBodySchema = validateSchema(createQuestionBodySchema);

const createQuestionController = async (event: ControllerEvent): Promise<ControllerResponse> => {
  const { body } = event;

  if (!validateBodySchema(body)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid request body' },
    };
  }

  const question = await createQuestionService({
    question: body.question,
    options: body.options,
  });

  return {
    statusCode: StatusCodes.CREATED,
    body: question,
  };
};

export default createQuestionController;
