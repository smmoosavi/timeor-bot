
export function characterLog (bot) {
  bot.on('text', (ctx, next) => {
    const str = ctx.message.text
    const v = str.split('').map(function (s) {
      return '\\u' + ('0000' + s.charCodeAt(0).toString(16)).slice(-4)
    }).join('')
    console.log(v)
    next()
  })
}