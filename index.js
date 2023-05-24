const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
const ENV = require('dotenv').config().parsed;

const telegramToken = ENV.TELEGRAM_BOT_TOKEN;

const openAiApiKey = ENV.CHAT_GPT_API_KEY;

const configuration = new Configuration({
    apiKey: openAiApiKey,
});

const bot = new TelegramBot(telegramToken, {polling: true});

const openAi = new OpenAIApi(configuration);

const chatGPTResponse = async (text) => {
    console.log(text);
    const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 150,
  });

  return response.data.choices[0].text;
};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        bot.sendMessage(chatId, '...')
        bot.sendMessage(chatId, '.....')
        const reply = await chatGPTResponse(text);

        bot.sendMessage(chatId, reply);
    } catch (error) {
        console.log('Error during ChatGPT comunication:', error);
        bot.sendMessage(chatId, 'I\'m sorry I have a headache right now...')
    }
})

console.log('Bot hearing...');
