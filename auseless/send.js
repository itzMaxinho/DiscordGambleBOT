let pozyczka = require('./start.js')

module.exports.run = async (bot, message, args) => {

    console.log("sending " + pozyczka.zmienna)

    pozyczka.zmienna += 10;

    console.log("sending " + pozyczka.zmienna)

    message.reply(pozyczka.zmienna)
}

module.exports.help = {
    name: "send",
    aliases: ["send"]
}