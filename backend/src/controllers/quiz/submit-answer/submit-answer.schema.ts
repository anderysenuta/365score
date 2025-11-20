const submitAnswerParamsSchema = {
  type: 'object',
  properties: {
    quizId: {
      type: 'string',
      format: 'uuid',
    },
    questionId: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: ['quizId', 'questionId'],
  additionalProperties: false,
} as const;

const submitAnswerBodySchema = {
  type: 'object',
  properties: {
    selectedOptionId: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: ['selectedOptionId'],
  additionalProperties: false,
} as const;

export { submitAnswerParamsSchema, submitAnswerBodySchema };