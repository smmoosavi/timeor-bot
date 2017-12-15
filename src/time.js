import moment from 'moment'
import emoji from 'node-emoji'
import Markup from 'telegraf/markup'
import { saveTime, getDay, getTotal, saveExitTime, saveEnterTime } from './logic'
import { pad2 } from './utils'

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

  async function updateOut (ctx, error) {
    let text = ':taxi: برفتی\n:stopwatch: ' + moment().format('YYYY-MM-DD hh:mm:ss')
    await ctx.editMessageText(emoji.emojify(text))

    if (error) {
      if (error === 'not-started') {
        await ctx.reply('کی اومدی که الان داری می‌ری؟\nمن که چیزی یادم نمی‌آد')
      }
      if (error === 'not-same-day') {
        await ctx.reply('خیلی وقت پیش اومده بودی، دیگه حسابش از دست من در رفته. خودت ضرب و تقسیم کن.')
      }
    }

    const today = getDay(moment())
    const total = await getTotal(ctx, today)
    const totalValue = (total.asHours() / 8).toFixed(2)
    const totalText = pad2(Math.floor(total.asHours())) + ':' + pad2(total.minutes()) + ':' + pad2(total.seconds())
    text = `:spiral_calendar_pad: ${today}\n:clipboard: total ${totalText} (${totalValue})`
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
    await saveEnterTime(ctx, 'in', moment())
    await updateIn(ctx)
  })
  bot.action('out', async (ctx, next) => {
    const {error} = await saveExitTime(ctx, 'out', moment())
    await updateOut(ctx, error)
  })

}