import moment from 'moment'
import emoji from 'node-emoji'
import Markup from 'telegraf/markup'
import { createItem, getDay } from './logic'

export const timeHandler = (bot) => {
  bot.start(async (ctx) => {
    await ctx.reply('به روبات تایمُر خوش‌آمدید!!!')
    await ctx.reply('هر وقت اومدی بگو', Markup
      .inlineKeyboard([
        [
          Markup.callbackButton(emoji.emojify(':computer: اومدم'), 'in'),
        ],
      ])
      .resize()
      .extra())
  })

  async function updateIn (ctx) {
    let text = ':computer: اومدی\n:stopwatch: ' + moment().format('YYYY-MM-DD hh:mm:ss')
    await ctx.editMessageText(emoji.emojify(text))

    await ctx.reply('هر وقت برفتی بگو', Markup
      .inlineKeyboard([
        [
          Markup.callbackButton(emoji.emojify(':taxi: برفتم'), 'out'),
        ],
      ])
      .resize()
      .extra())
  }

  async function updateOut (ctx) {
    let text = ':taxi: برفتی\n:stopwatch: ' + moment().format('YYYY-MM-DD hh:mm:ss')
    await ctx.editMessageText(emoji.emojify(text))

    const today = getDay(moment())
    text = ':spiral_calendar_pad: ' + today + '\n:clipboard: total 4:00 (0.5)'
    await ctx.reply(emoji.emojify(text))

    await ctx.reply('هر وقت اومدی بگو', Markup
      .inlineKeyboard([
        [
          Markup.callbackButton(emoji.emojify(':computer: اومدم'), 'in'),
        ],
      ])
      .resize()
      .extra())
  }

  bot.action('in', async (ctx, next) => {
    ctx.session.state = 'in'
    await createItem(ctx, 'in', moment())
    await updateIn(ctx)
  })
  bot.action('out', async (ctx, next) => {
    ctx.session.state = 'out'
    await createItem(ctx, 'out', moment())
    await updateOut(ctx)
  })

}