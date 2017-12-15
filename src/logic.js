import debug from 'debug'
import moment from 'moment'
import R from 'ramda'

const log = debug('timeor:time-entity')

export const getDay = (m) => {
  return m.clone()
    .add(-4, 'h').format('YYYY-MM-DD')
}

export const listItems = async (ctx, day) => {
  const docs = await ctx.db.times.find()
    .where('fromId').eq(ctx.from.id)
    .where('day').eq(day)
    .sort({'datetime': 1})
    .exec()
  return R.map(R.pick(['fromId', 'day', 'datetime', 'timestamp', 'type']))(docs)
}

export const getTotal = async (ctx, day) => {
  const fromId = `${ctx.from.id}`
  const items = await ctx.db.times.find()
    .where('fromId').eq(fromId)
    .where('day').eq(day)
    .exec()
  const total = R.pipe(
    R.map(R.pick(['start_timestamp', 'end_timestamp'])),
    R.filter(({start_timestamp}) => start_timestamp !== -1),
    R.map(({start_timestamp, end_timestamp}) => (end_timestamp - start_timestamp)),
    R.sum,
  )(items)
  return moment.duration(total, 's')
}

export const getUserData = R.pick(['id', 'first_name', 'last_name', 'username', 'start_timestamp'])

export const saveEnterTime = async (ctx, type, mDate) => {
  const id = `${ctx.from.id}`
  let user = await ctx.db.users.findOne(id).exec()
  if (!user) {
    const {first_name, last_name, username} = ctx.from
    user = await ctx.db.users.insert({id, first_name, last_name, username, start_timestamp: -1})
  }
  await user.set('start_timestamp', mDate.unix())
}
export const saveExitTime = async (ctx, type, mDate) => {
  const id = `${ctx.from.id}`
  let user = await ctx.db.users.findOne(id).exec()
  if (!user) {
    const {first_name, last_name, username} = ctx.from
    user = await ctx.db.users.insert({id, first_name, last_name, username, start_timestamp: -1})
  }
  const start_timestamp = await user.get('start_timestamp')
  const end_timestamp = mDate.unix()
  if (start_timestamp === -1) {
    return {error: 'not-started'}
  }

  const day = getDay(moment.unix(start_timestamp))
  const today = getDay(mDate)
  if (day !== today) {
    return {error: 'not-same-day'}
  }
  await user.set('start_timestamp', -1)
  await ctx.db.times.insert({fromId: id, start_timestamp, end_timestamp, day})
  return {error: null}
}