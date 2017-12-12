export const timesSchema = {
  title: 'time schema',
  version: 0,
  type: 'object',
  properties: {
    fromId: {
      type: 'number',
    },
    type: {
      type: 'string',
    },
    timestamp: {
      type: 'number',
    },
    datetime: {
      type: 'string',
      index: true,
    },
    day: {
      type: 'string',
    },
  },
}