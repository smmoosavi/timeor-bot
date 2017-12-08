require('dotenv').config()
import { createBot } from './bot'
import { catchError } from './catchError'
import { characterLog } from './tests'
import { timeHandler } from './time'

async function main () {
  const bot = await createBot()
  catchError(bot)
  characterLog(bot)
  timeHandler(bot)
  bot.startPolling()
}

main().catch((e) => {
  console.error('--- error ---')
  console.error(e)
})
