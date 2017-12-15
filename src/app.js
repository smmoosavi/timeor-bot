require('dotenv').config()
import { createBot } from './bot'
import { catchError } from './catchError'
import { characterLog } from './tests'
import { timeHandler } from './time'

export function app () {
  async function run () {
    const bot = await createBot()
    catchError(bot)
    characterLog(bot)
    timeHandler(bot)
    bot.startPolling()
  }

  run().catch((e) => {
    console.error('--- error ---')
    console.error(e)
  })

}
