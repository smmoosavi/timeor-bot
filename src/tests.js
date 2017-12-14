import emoji from 'node-emoji'
import debug from 'debug'

const log = debug('timeor:debug-text')

export function characterLog (bot) {
  bot.on('text', (ctx, next) => {
    const str = ctx.message.text
    log(emoji.unemojify(str))
    next()
  })
}