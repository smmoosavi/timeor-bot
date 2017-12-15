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
  return moment.duration(3 * 60 + 44, 'm')
}

export const createItem = async (ctx, type, mDate) => {
  const item = {
    fromId: ctx.from.id,
    type,
    timestamp: mDate.unix(),
    datetime: mDate.format(),
    day: getDay(mDate),
  }
  const fromData = R.pick(['first_name', 'last_name'])(ctx.from)
  log(JSON.stringify({...item, ...fromData}))
  await ctx.db.times.insert(item)
}