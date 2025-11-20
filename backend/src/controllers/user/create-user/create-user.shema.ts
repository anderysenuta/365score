const createUserBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
};

export default createUserBodySchema;
