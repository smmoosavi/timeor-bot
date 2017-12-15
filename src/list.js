import moment from 'moment'
import R from 'ramda'
import { getDay, getUserData, listItems } from './logic'

export function listHandler (bot) {
  bot.command('list', async (ctx) => {
    const id = `${ctx.from.id}`
    let user = await ctx.db.users.findOne(id).exec()
    console.log(getUserData(user))

    const day = getDay(moment())
    const docs = await ctx.db.times.find()
      .where('fromId').eq(id)
      .where('day').eq(day)
      .exec()
    const data = R.map(R.pick(['fromId', 'start_timestamp', 'end_timestamp', 'day']))(docs)
    console.log(data)
  })
}