import Markup from 'telegraf/markup'
import moment from 'moment'

export function timeHandler (bot) {
  bot.start((ctx) => {
    ctx.reply('Welcome!!!', Markup
      .inlineKeyboard([
        [Markup.callbackButton('\ud83d\udcbb I am in', 'in'), Markup.callbackButton('\ud83d\ude95 I am out', 'out')], // Row1 with 2 buttons
        //[Markup.callbackButton('\ud83d\udcdc List', 'list')], // Row1 with 2 buttons
      ])
      .resize()
      .extra())
  })

  function update (ctx) {
    const row1 = []
    let text = 'list\n'
    if (ctx.session.state === 'in') {
      text += 'you are in'
    }
    if (ctx.session.state === 'out') {
      text += 'you are out'
    }
    if (ctx.session.state !== 'in') {
      row1.push(Markup.callbackButton('\ud83d\udcbb I am in', 'in'))
    }
    if (ctx.session.state !== 'out') {
      row1.push(Markup.callbackButton('\ud83d\ude95 I am out', 'out'))
    }

    ctx.editMessageText(text, Markup
      .inlineKeyboard([
        row1, // Row1 with 2 buttons
        //[Markup.callbackButton('\ud83d\udcdc List', 'list')], // Row1 with 2 buttons
      ])
      .resize()
      .extra())
  }

  const createItem = async (ctx, type) => {
    const m = moment()
    const item = {
      fromId: ctx.from.id,
      type,
      time: m.unix(),
      day: m.clone().add(-4, 'h').format('YYYY-MM-DD'),
    }
    await ctx.db.times.insert(item)
  }

  bot.action('list', (ctx, next) => {
    update(ctx)
  })
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