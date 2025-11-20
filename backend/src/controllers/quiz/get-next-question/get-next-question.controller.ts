import { StatusCodes } from 'http-status-codes';
import type { ControllerEvent, ControllerResponse } from '../../../utils/router/router';
import { validateSchema } from '../../../utils/validateSchema/validateSchema';
import getNextQuestionParamsSchema from './get-next-question.schema';
import { getNextQuestionService } from './get-next-question.service';
import type { NextQuestion } from './get-next-question.types';

const validateParamsSchema = validateSchema(getNextQuestionParamsSchema);

type GetNextQuestionParams = {
  quizId: string;
};

const getNextQuestionController = async (
  event: ControllerEvent<GetNextQuestionParams>,
): Promise<ControllerResponse<NextQuestion | { error: string } | { message: string }>> => {
  const { params } = event;

  if (!validateParamsSchema(params)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid quiz ID' },
    };
  }

  const { quizId } = params;

  try {
    const question = await getNextQuestionService(quizId);

    if (!question) {
      return {
        statusCode: StatusCodes.OK,
        body: { message: 'No more questions available' },
      };
    }

    return {
      statusCode: StatusCodes.OK,
      body: question,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get next question';

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: errorMessage },
    };
  }
};

export default getNextQuestionController;
