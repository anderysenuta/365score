const createQuizBodyShema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userId: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: ['userId'],
};

export default createQuizBodyShema;
