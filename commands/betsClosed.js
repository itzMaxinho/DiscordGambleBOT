const money = require("../money.json");
const trigger = require("../isOpen.json")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (message.author.id == "adminID") {
    } else
        return message.reply("nie masz uprawnień")

    if (trigger.isOpen) {

        message.channel.send(":no_entry: **BETY ZAMKNIĘTE** :no_entry: **BETY ZAMKNIĘTE** :no_entry:")
        message.channel.send("ㅤ")

        trigger.isOpen = false;

        let betGreen = [];
        let betRed = [];
        let betBlack = [];

        money.users.map(a => {
            if (a.colorBet == "green") {
                betGreen.push({ name: a.name, valueBet: a.valueBet });

            } if (a.colorBet2 == "green") {
                betGreen.push({ name: a.name, valueBet: a.valueBet2 });

            } if (a.colorBet == "red") {
                betRed.push({ name: a.name, valueBet: a.valueBet });

            } if (a.colorBet2 == "red") {
                betRed.push({ name: a.name, valueBet: a.valueBet2 });

            } if (a.colorBet == "black") {
                betBlack.push({ name: a.name, valueBet: a.valueBet });

            } if (a.colorBet2 == "black") {
                betBlack.push({ name: a.name, valueBet: a.valueBet2 });
            }
        })

        betGreen = betGreen.sort((a, b) => b.valueBet - a.valueBet)
        console.log(betGreen)

        betRed = betRed.sort((a, b) => b.valueBet - a.valueBet)
        console.log(betRed)

        betBlack = betBlack.sort((a, b) => b.valueBet - a.valueBet)
        console.log(betBlack)

        message.channel.send(`:coin: BETY W TEJ KOLEJCE: 
     ${betGreen.map(user => `\n:green_circle: **${user.name}** obstawił $**${user.valueBet}**`)}
     ${betRed.map(user => `\n:red_circle: **${user.name}** obstawił $**${user.valueBet}**`)}
     ${betBlack.map(user => `\n:black_circle: **${user.name}** obstawił $**${user.valueBet}**`)}
    `)
    }

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });

    fs.writeFile("./isOpen.json", JSON.stringify(trigger), (err) => {
        if (err) console.log(err);
    });
}

module.exports.help = {
    name: "close",
    aliases: ["close", "c"]
}
