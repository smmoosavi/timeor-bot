import { listItems } from './logic'

export function listHandler (bot) {
  bot.command('list', async (ctx) => {
    const data = await listItems(ctx)
    console.log(data)
  })
}