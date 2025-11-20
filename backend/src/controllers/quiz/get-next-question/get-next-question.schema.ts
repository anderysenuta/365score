export default {
  type: 'object',
  properties: {
    quizId: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: ['quizId'],
  additionalProperties: false,
} as const;