import { StatusCodes } from 'http-status-codes';
import type { ControllerEvent, ControllerResponse } from '../../../utils/router/router';
import { validateSchema } from '../../../utils/validateSchema/validateSchema';
import { createUserService } from './create-user.service';
import createUserBodySchema from './create-user.shema';
import type { User } from './create-user.types';

const validateBodySchema = validateSchema(createUserBodySchema);

type CreateUserBody = {
  name: string;
};

const createUserController = async (event: ControllerEvent<CreateUserBody>): Promise<ControllerResponse<User | { error: string }>> => {
  const { body } = event;

  if (!validateBodySchema(body)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { error: 'Invalid request body' },
    };
  }

  const user = await createUserService(body.name);

  return {
    statusCode: StatusCodes.CREATED,
    body: user,
  };
};

export default createUserController;
