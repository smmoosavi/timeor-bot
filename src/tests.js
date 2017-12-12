import emoji from 'node-emoji'

export function characterLog (bot) {
  bot.on('text', (ctx, next) => {
    const str = ctx.message.text
    console.log(emoji.unemojify(str))
    next()
  })
}