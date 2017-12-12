import moment from 'moment'
import emoji from 'node-emoji'
import Markup from 'telegraf/markup'
import { createItem, getToday } from './logic'

export function timeHandler (bot) {
  bot.start((ctx) => {
    ctx.reply('Welcome!!!', Markup
      .inlineKeyboard([
        [Markup.callbackButton(emoji.emojify(':computer: I am in'), 'in')],
      ])
      .resize()
      .extra())
  })

  function update (ctx, type) {
    const row1 = []
    if (type === 'in') {
      let text = ':computer: you are in\n:stopwatch: ' + moment().format('YYYY-MM-DD hh:mm:ss')
      row1.push(Markup.callbackButton(emoji.emojify(':taxi: I am out'), 'out'))
      ctx.editMessageText(emoji.emojify(text))
    }
    if (type === 'out') {
      let text = ':taxi: you are out\n:stopwatch: ' + moment().format('YYYY-MM-DD hh:mm:ss')
      row1.push(Markup.callbackButton(emoji.emojify(':computer: I am in'), 'in'))
      ctx.editMessageText(emoji.emojify(text))

      // const today = getToday(moment())
      // text = ':spiral_calendar_pad: ' + today + '\n:clipboard: total 4:00 (0.5)'
      // ctx.reply(emoji.emojify(text))

    }

    ctx.reply('update your status', Markup
      .inlineKeyboard([
        row1, // Row1 with 2 buttons
        //[Markup.callbackButton('\ud83d\udcdc List', 'listItems')], // Row1 with 2 buttons
      ])
      .resize()
      .extra())
  }

  bot.action('in', async (ctx, next) => {
    ctx.session.state = 'in'
    await createItem(ctx, 'in')
    update(ctx, 'in')
  })
  bot.action('out', async (ctx, next) => {
    ctx.session.state = 'out'
    await createItem(ctx, 'out')
    update(ctx, 'out')
  })

}