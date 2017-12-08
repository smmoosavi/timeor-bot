require('dotenv').config()

import Telegraf from 'telegraf'
import session from 'telegraf/session'
import { createDb } from './db'

export async function createBot () {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  bot.use(session())

  bot.context.db = await createDb()
  return bot
}
