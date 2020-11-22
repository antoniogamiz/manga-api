const TelegramBot = require("node-telegram-bot-api");
const superagent = require("superagent");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = process.env.API_URL;
const bot = new TelegramBot(TOKEN);

bot.setWebHook(
  `https://upbeat-archimedes-878dc0.netlify.app/.netlify/functions/bot/bot${TOKEN}`
);

exports.handler = async (context, cb) => {
  //   const mangaID = context.url.match(/\/manga (.+)/)[1];
  console.log(new Date());
  console.log(context);
  //   const mangaID = "lf924506";
  //   const response = await superagent.get(API_URL + `/mangas/${mangaID}`);
  //   bot.sendMessage(chatID, "Received");
  return { statusCode: 200, body: "" };
};
