const TelegramBot = require('node-telegram-bot-api');
// PokeBot
const token = '1028351135:AAFkvqp1bphmdEFy_P2fnDLCsshsjGrzl9M';
// Bot Pruebas
//const token = '1007840862:AAGMRVGHB4Qx28JzojnCupHW7A79nAmKTrs';
const bot = new TelegramBot(token, {polling: true});
// ID DEL CHAT DE POKEMON -1001293261708
// ID DEL CHAT DE PRUEBA -1001310721280

// ERROR DEL BOT

bot.on('polling_error', function (error) {
    console.log(error);
});

// SACAR EL ID DEL GRUPO DONDE QUERAMOS QUE ACTUE EL BOT

// bot.onText(/^\/chatid/, (msg) => {
//     const chatId = msg.chat.id;
//     console.log(chatId)
// });

// MENSAJE DE BIENVENIDA

bot.onText(/^\/hola/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", que tal estas?");
});
bot.onText(/^\/Hola/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", que tal estas?");
});

/////////// EVENTO DE BIENVENIDA Y DESPEDIDA

bot.on('message', function (msg) {

    var chatId = msg.chat.id;

    if (msg.new_chat_members != undefined) {

        var nameNewMember = msg.new_chat_member.first_name;

        bot.sendMessage(chatId, "Hola " + nameNewMember + ", bienvenido al grupo, lee las normas en el mensaje anclado.");

        // SI SE METE UN BOT LO BORRA
        if (msg.new_chat_member.is_bot == true) {
            bot.kickChatMember(msg.chat.id, msg.from.id);
            bot.unbanChatMember(msg.chat.id, msg.from.id);
        }
    } else if (msg.left_chat_member != undefined) {
        var nameLeftMember = msg.left_chat_member.first_name;
        bot.sendMessage(chatId, nameLeftMember + " mucha suerte amigo!")
    }
});

/////////// BORRAR UN MENSAJE CON EL COMANDO /BORRAR

bot.onText(/^\/borrar/, (msg) => {

    var chatId = msg.chat.id;
    var messageId = msg.message_id;
    var userId = msg.from.id;
    var replyMessage = msg.reply_to_message.message_id;
    var nameUser = msg.from.first_name;

    bot.getChatMember(chatId, userId).then(function (data) {
        if ((data.status == 'creator') || (data.status == 'administrator')) {
            if (msg.reply_to_message == undefined) {
                console.log("borrar")
                return;
            }
            bot.deleteMessage(chatId, replyMessage);
        } else {
            bot.sendMessage(chatId, "Lo siento " + nameUser + ", no eres administrador")
        }
    })
    bot.deleteMessage(chatId, messageId);
});


/////////// CONTADOR PARA QUE MANDE LINK DEL GRUPO

// function intervalFunc() {
//     bot.sendMessage(-1001310721280, "Comparte con tus amigos el grupo");
// }
//    setInterval(intervalFunc, 3000);

// /////////// CONTADOR PARA QUE MANDE LINKS A AMAZON

// function intervalFunc() {
//     bot.sendMessage(-1001310721280, "hola");
// }
// //  setInterval(intervalFunc, 3000);