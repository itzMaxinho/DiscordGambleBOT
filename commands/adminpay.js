const money = require("../money.json");
const fs = require("fs");

module.exports.help = {
    name: "adminpay",
    aliases: ["add"]
}

module.exports.run = async (bot, message, args) => {

    if (message.author.id == "adminID") {
    } else
        return message.reply("nie masz uprawnień")

    let userr = message.mentions.users.first() || bot.users.get(args[0]);
    if (!userr) return message.reply("nie znaleziono użytkownika");

    if (!args[1]) return message.reply("wprowadź ilość $ do dodania");

    money.users = money.users.map(user => {

        if (userr.id == user.id && user.startingMoney != null) {

            console.log("--------NADPISYWANIE KONTA-------")
            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney += parseInt(args[1]),
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins,
                didBet: user.didBet,
                money: user.money += parseInt(args[1]),
                colorBet: user.colorBet,
                valueBet: user.valueBet,
                colorBet2: user.colorBet2,
                valueBet2: user.valueBet2
            })

        } else if (userr.id == user.id && user.startingMoney == null) {

            console.log("--------NADPISYWANIE KONTA-------")
            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: parseInt(args[1]),
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins,
                didBet: user.didBet,
                money: user.money += parseInt(args[1]),
                colorBet: user.colorBet,
                valueBet: user.valueBet,
                colorBet2: user.colorBet2,
                valueBet2: user.valueBet2
            })
        }

        else if (userr.id != user.id) {
            return user
        }
    })

    if (!Boolean(money.users.filter(siema => siema.id == userr.id).length)) {
        console.log("--------DODAWANIE KONTA-------")
        money.users.push({
            id: userr.id,
            name: bot.users.get(userr.id).tag,
            startingMoney: parseInt(args[1]),
            totalBet: 0,
            timesBet: 0,
            totalWins: 0,
            didBet: null,
            money: parseInt(args[1]),
            colorBet: userr.colorBet,
            valueBet: userr.valueBet,
            colorBet2: userr.colorBet2,
            valueBet2: userr.valueBet2
        })
    }

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    })

    return message.channel.send(`Użytkownik **${userr.tag}** otrzymał $**${args[1]}**!`);
}
