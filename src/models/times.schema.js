export const timesSchema = {
  title: 'time schema',
  version: 0,
  type: 'object',
  properties: {
    fromId: {
      type: 'string',
    },
    start_timestamp: {
      type: 'number',
    },
    end_timestamp: {
      type: 'number',
    },
    day: {
      type: 'string',
    },
  },
}