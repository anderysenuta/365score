import { type Validate, validator } from '@exodus/schemasafe';

export const validateSchema = (schema: object): Validate => {
  return validator(schema, { allErrors: true, includeErrors: true });
};
