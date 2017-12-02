require('dotenv').config()
import Telegraf from 'telegraf'

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => {
  console.log('started:', ctx.from)
  return ctx.reply('Welcome!')
})

bot.startPolling()