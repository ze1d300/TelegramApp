import { Telegraf, Markup } from "telegraf";
import { format } from "date-fns";
const bot = new Telegraf("7010891718:AAGNFugMzMVHloTzRSdqPGNAk01KoUUikTE");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getCurrentDateTime() {
  const currentDate = new Date();
  return format(currentDate, "yyyy-MM-dd HH:mm:ss");
}
const getCoinSide = () => (getRandomInt(0, 1) === 0 ? "Heads" : "Tails");
const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Flip again", "flip_a_coin"),
]);
bot.action("flip_a_coin", async (ctx) => {
  await ctx.editMessageText(
    `${getCoinSide()}\nEdited: ${getCurrentDateTime}`,
    coinInlineKeyboard
  );
});
bot.hears("Flip a coin", (ctx) => ctx.reply(getCoinSide(), coinInlineKeyboard));
const replyKeyboard = Markup.keyboard([["Flip a coin"]]);
bot.use(async (ctx) => {
  await ctx.reply("What to do ?", replyKeyboard);
});
console.log("Bot is ready!");
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
