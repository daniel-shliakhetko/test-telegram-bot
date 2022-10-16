const TelegramApi = require("node-telegram-bot-api");

const token = "5661103096:AAH-yeX9D7yhMzNVy-FsTezBkTxrzZ6X4ws";

const bot = new TelegramApi(token, { polling: true });

const inlineKeyboards = {
  choice: {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: "Don't click", callback_data: "clicked" }]],
    }),
  },
};
const keyboards = {
  choice: {
    reply_markup: {
      keyboard: [[{ text: "Don't click" }]],
    },
  },
};

console.log("Bot started!");

bot.setMyCommands([
  { command: "/start", description: "Start Product" },
  { command: "/help", description: "Commands List" },
]);

bot.on("message", (message) => {
  const text = message.text;
  const id = message.chat.id;
  // console.log(message);
  if (text === "Don't click") {
    bot.sendMessage(id, "Are ya stupid or smthin?");
  } else {
    commands(text, id, bot);
  }
});

const commands = (text, id, bot) => {
  switch (text) {
    case "/start":
      bot.sendSticker(
        id,
        "CAACAgIAAxkBAAEGGMxjSp8fEJibi3IxuWZfVD09Ss6dxwACSQIAAlrjihcfRj5kmXz3jCoE"
      );
      bot.sendMessage(id, "Welcome!", keyboards.choice);
      break;
    case "/help":
      bot.sendMessage(id, "Commands list", inlineKeyboards.choice);
      break;
    default:
      bot.sendMessage(id, "Wrong command, write /help to see commands list");
      break;
  }
};


bot.on("callback_query", (message) => {
  // console.log(message);
  if (message.data === "clicked") {
    bot.sendMessage(message.message.chat.id, "Are ya stupid or smthin?");
  }
});
