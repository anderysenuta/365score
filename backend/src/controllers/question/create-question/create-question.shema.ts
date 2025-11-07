const createQuestionBodySchema = {
  title: 'Create Question body schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    question: { type: 'string' },
    options: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          value: { type: 'string' },
          isCorrect: { type: 'boolean' },
        },
      },
      minItems: 1,
    },
  },
  required: ['question', 'options'],
};

export default createQuestionBodySchema;
