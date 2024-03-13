const trigger = require("../isOpen.json")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (message.author.id == "adminID") {
    } else
        return message.reply("nie masz uprawnień")

    if (!trigger.isOpen) {

        message.channel.send(":white_check_mark: **BETY OTWARTE** :white_check_mark: **BETY OTWARTE** :white_check_mark:")
        trigger.isOpen = true;
    }

    fs.writeFile("./isOpen.json", JSON.stringify(trigger), (err) => {
        if (err) console.log(err);
    });
}

module.exports.help = {
    name: "open",
    aliases: ["open", "o"]
}
