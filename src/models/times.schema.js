export const timesSchema = {
  title: 'time schema',
  version: 0,
  type: 'object',
  properties: {
    fromId: {
      type: 'number',
    },
    type: {
      type: 'string'
    },
    time: {
      type: 'number'
    },
    day: {
      type: 'string'
    },
  },
}