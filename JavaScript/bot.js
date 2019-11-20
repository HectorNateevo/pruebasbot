const TelegramBot = require('node-telegram-bot-api');
const Telegraf = require('telegraf')
const token = '1028351135:AAFkvqp1bphmdEFy_P2fnDLCsshsjGrzl9M';
const bot = new TelegramBot(token, {polling:true});

bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, "Bienvenido a mi bot " + nameUser);
});

bot.onText(/^\/hola/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola  " + msg.from.first_name);
});