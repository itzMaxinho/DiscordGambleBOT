const money = require("../money.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (message.author.id == "adminID") {
    } else
        return message.reply("nie masz uprawnień")

    message.channel.send(`Oto osoby, którym udało się zachować dodatnie saldo: `)

    money.users = money.users.map(user => {

        if (user.money > 0 && user.timesBet > 0) {

            if (user.timesBet < 25) {
                message.channel.send(`**${user.name} nie obstawił** wystarczającej ilości razy (**${user.timesBet}/25**)... :x:`)
                return user

            } else if (user.totalBet < (user.startingMoney / 2)) {
                message.channel.send(`**${user.name} nie obstawił** wystarczającej ilości punktów (**${user.totalBet}/${user.startingMoney / 2}**)... :x:`)
                return user

            } else if (user.totalBet > (user.startingMoney / 2) && user.timesBet >= 25) {
                message.channel.send(`**${user.name} obstawił** wystarczającą ilość razy (**${user.timesBet}/25**) oraz odpowiednią ilość punktów (**${user.totalBet}/${user.startingMoney / 2}**)! :white_check_mark:`)
                message.channel.send(`A jego aktualny stan konta wynosi... $**${user.money}** !!! Gratulacje **${user.name}**!`)
                return user

            } else {
                return user = ({
                    id: user.id,
                    name: user.name,
                    startingMoney: user.startingMoney,
                    totalBet: user.totalBet,
                    timesBet: 0,
                    totalWins: user.totalWins,
                    didBet: user.didBet,
                    money: user.money,
                    colorBet: user.colorBet,
                    valueBet: user.valueBet,
                    colorBet2: user.colorBet2,
                    valueBet2: user.valueBet2
                })
            }

        } else {
            return user
        }
    })

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });

    message.channel.send('Wpisz **!stats**, żeby zobaczyć swoje statystyki w tej edycji!')
}

module.exports.help = {
    name: "end",
    aliases: ["end"]
}