import moment from 'moment'
import R from 'ramda'

export const getToday = (m) => {
  return m.clone()
    .add(-4, 'h').format('YYYY-MM-DD')
}

export const listItems = async (ctx) => {
  const today = getToday(moment())
  const docs = await ctx.db.times.find()
    .where('fromId').eq(ctx.from.id)
    .where('day').eq(today)
    .sort({'datetime': 1})
    .exec()
  return R.map(R.pick(['fromId', 'day', 'datetime', 'timestamp', 'type']))(docs)
}

export const createItem = async (ctx, type) => {
  const m = moment()
  const item = {
    fromId: ctx.from.id,
    type,
    timestamp: m.unix(),
    datetime: m.format(),
    day: getToday(m),
  }
  const fromData = R.pick(['first_name', 'last_name'])(ctx.from)
  console.log(JSON.stringify({...item, ...fromData}))
  await ctx.db.times.insert(item)
}