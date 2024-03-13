const fs = require("fs");
const money = require("../money.json")

module.exports.run = async (bot, message, args) => {

    if (!args[0]) {
        var user = message.author;
    } else {
        return message.reply("możesz sprawdzić **wyłącznie własne saldo**. Wpisz po prostu **!ile**");
    }

    if (args[0] != message.mentions.users.first()) {
        return message.reply("możesz sprawdzić **wyłącznie własne saldo**. Wpisz po prostu **!ile**");
    }

    if (!Boolean(money.users.filter(siema => siema.id == user.id).length)) {
        console.log("--------DODAWANIE KONTA-------")

        money.users.push({
            id: user.id,
            name: bot.users.get(user.id).tag,
            startingMoney: null,
            totalBet: 0,
            timesBet: 0,
            totalWins: 0,
            didBet: null,
            money: 0,
            colorBet: null,
            valueBet: null
        })

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        return message.reply("tworzę konto...")
    }

    let result;
    money.users.map(b => {
        if (b.id == user.id) {
            result = b.money;
            return result;
        }
    })

    return message.reply(`posiada $**${result}**`);
}

module.exports.help = {
    name: "balance",
    aliases: ["saldo", "money", "hajs", "ile", "konto", "saldo", "kasa", "mamona", "zielone", "cash", "itp"]
}