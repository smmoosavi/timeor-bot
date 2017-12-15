export const usersSchema = {
  title: 'user schema',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    start_timestamp: {
      type: 'number',
    },
  },
}