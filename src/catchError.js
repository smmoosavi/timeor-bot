export function catchError (bot) {
  bot.catch((err) => {
    console.error('Ooops', err)
  })
}