const Telegraf = require("telegraf");
const fetch = require("node-fetch");

const API_URL = process.env.API_URL;

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply(process.uptime()));

bot.hears(/\/manga (.+)/, async (ctx) => {
  const mangaID = ctx.message.text.substr(7);
  const res = await (await fetch(API_URL + `/mangas/${mangaID}`)).json();
  bot.telegram.sendMessage(ctx.chat.id, res);
});

bot.hears(/\/available (.+)/, async (ctx) => {
  const n = ctx.message.text.substr(11);
  const res = await (await fetch(API_URL + `/available/${n}`)).json();
  bot.telegram.sendMessage(ctx.chat.id, res);
});

bot.hears(/\/genre (.+)/, async (ctx) => {
  const genre = ctx.message.text.substr(7);
  const res = await (await fetch(API_URL + `/available/genre/${genre}`)).json();
  bot.telegram.sendMessage(ctx.chat.id, res);
});

bot.hears(/\/status (.+)/, async (ctx) => {
  const status = ctx.message.text.substr(8);
  const res = await (
    await fetch(API_URL + `/available/status/${status}`)
  ).json();
  bot.telegram.sendMessage(ctx.chat.id, res);
});

exports.handler = async (event, ctx, callback) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return callback(null, { statusCode: 200 });
};
