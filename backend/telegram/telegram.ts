/*Done! Congratulations on your new bot. You will find it at t.me/ToDo_EDS_Bot. You can now add a description,
about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished
creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully
operational before you do this.

Use this token to access the HTTP API:
2081440919:AAFLeXblObE6iBkkBKHHwkqM4gT66yeot4Y
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api*/

const authtg = require('../auth/auth.ts');
const tgMsg = require('./message.ts');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '2081440919:AAFLeXblObE6iBkkBKHHwkqM4gT66yeot4Y';

// Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});

module.exports.createTelegramBot = () => {
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token, {polling: true});


// Matches "/echo [whatever]"
  bot.onText(/\/echo (.+)/, (msg, match) => {
    // console.log('ECHO', match);
    /* MATCH ->
    [
      '/echo test',
      'test',
      index: 0,
      input: '/echo test',
      groups: undefined
    ] */

    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

// Listen for any kind of message. There are different kinds of
// messages.
  bot.on('message', (msg) => {
    // console.log('MSG', msg);
    const chatId = msg.chat.id;

    authtg.getUserIdByTgId(chatId).then(userId => {
      tgMsg.msg(msg, userId).then(todos => {
        bot.sendMessage(chatId, todos);
      }, err => {
        bot.sendMessage(chatId, 'No tasks');
      });
    }, err => {
      bot.sendMessage(chatId, 'Wrong User');
    });

    /*{
      message_id: 5,
        from: {
      id: 150962674,
        is_bot: false,
        first_name: 'Дмитрий',
        last_name: 'Елагин',
        username: 'maximstepanov',
        language_code: 'ru'
    },
      chat: {
        id: 150962674,
          first_name: 'Дмитрий',
          last_name: 'Елагин',
          username: 'maximstepanov',
          type: 'private'
      },
      date: 1636045457,
        text: '/echo fgdfg',
      entities: [ { offset: 0, length: 5, type: 'bot_command' } ]
    }*/

    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
  });
};
