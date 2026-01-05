import { StatusCodes } from 'http-status-codes';
import type { ControllerEvent, ControllerResponse } from '../../../utils/router/router';
import { validateSchema } from '../../../utils/validateSchema/validateSchema';
import { submitAnswerBodySchema, submitAnswerParamsSchema } from './submit-answer.schema';
import { submitAnswerService } from './submit-answer.service';
import type { SubmitAnswerResponse } from './submit-answer.types';

const validateParams = validateSchema(submitAnswerParamsSchema);
const validateBody = validateSchema(submitAnswerBodySchema);

type SubmitAnswerParams = {
  quizId: string;
  questionId: string;
};

type SubmitAnswerBody = {
  selectedOptionId: string;
};

const submitAnswerController = async (event: ControllerEvent): Promise<ControllerResponse<SubmitAnswerResponse | { error: string }>> => {
  const { params, body } = event;

  if (!validateParams(params)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid quiz ID or question ID' },
    };
  }

  if (!validateBody(body)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid request body. Required: selectedOptionId' },
    };
  }

  const { quizId, questionId } = params;
  const { selectedOptionId } = body;

  try {
    const result = await submitAnswerService(quizId, questionId, selectedOptionId);

    return {
      statusCode: StatusCodes.OK,
      body: result,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit answer';

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: errorMessage },
    };
  }
};

export default submitAnswerController;
