import moment from 'moment'
import { getDay, listItems } from './logic'

export function listHandler (bot) {
  bot.command('list', async (ctx) => {
    const data = await listItems(ctx, getDay(moment()))
    console.log(data)
  })
}