const answer = require("../isAnswer.json")
const money = require("../money.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (args[0] == answer.isAnswer) {

        message.reply('GRATULACJE! Na twoje konto przelane zostało **$1000** !')

        answer.isAnswer = null;

        fs.writeFile("./isAnswer.json", JSON.stringify(answer), (err) => {
            if (err) console.log(err);
        });

        money.users = money.users.map(user => {

            if (user.id == message.author.id) {

                return user = ({
                    id: user.id,
                    name: user.name,
                    startingMoney: user.startingMoney,
                    totalBet: user.totalBet,
                    timesBet: user.timesBet,
                    totalWins: user.totalWins,
                    didBet: user.didBet,
                    money: user.money + 1000,
                    colorBet: user.colorBet,
                    valueBet: user.valueBet,
                    colorBet2: user.colorBet2,
                    valueBet2: user.valueBet2
                })

            } else {

                return user
            }
        })

    } else {

        return
    }

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });
}

module.exports.help = {
    name: "odp",
    aliases: []
}