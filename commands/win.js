const money = require("../money.json");
const fs = require("fs");
const bet = require("./bet.js")

module.exports.run = async (bot, message, args) => {

    let winner = args[0];

    let winnerRed;
    let winnerBlack;
    let winnerGreen;

    if (message.author.id == "adminID") {

    } else
        return message.reply("nie masz uprawnień")

    if (winner.toLowerCase() == "red") {

        winnerRed = 1;
        winnerBlack = 2;
        winnerGreen = 2;

    } else if (winner.toLowerCase() == "black") {

        winnerRed = 2;
        winnerBlack = 1;
        winnerGreen = 2;

    } else if (winner.toLowerCase() == "green") {

        winnerRed = 2;
        winnerBlack = 2;
        winnerGreen = 1;

    } else {

        return message.reply("missclick")
    }

    let whoWon = [];
    money.users.map(a => {
        if (a.colorBet == winner && winner == "green") {
            whoWon.push({ name: a.name, valueBet: a.valueBet * 14 });

        } else if (a.colorBet2 == winner && winner == "green") {
            whoWon.push({ name: a.name, valueBet: a.valueBet2 * 14 });

        } else if (a.colorBet == winner && (winner == "red" || winner == "black")) {
            whoWon.push({ name: a.name, valueBet: a.valueBet * 2 });

        } else if (a.colorBet2 == winner && (winner == "red" || winner == "black")) {
            whoWon.push({ name: a.name, valueBet: a.valueBet2 * 2 });
        }
        return whoWon;
    })

    whoWon = whoWon.sort((a, b) => b.valueBet - a.valueBet)
    console.log(whoWon)

    whoWon = whoWon.sort((a, b) => b.valueBet2 - a.valueBet2)
    console.log(whoWon)

    money.users = money.users.map(user => {

        if (user.colorBet == winner && winner == "green") {

            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney,
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins + 1,
                didBet: user.didBet,
                money: user.money + user.valueBet * 14,
                colorBet: null,
                valueBet: null,
                colorBet2: null,
                valueBet2: null
            })

        } else if (user.colorBet2 == winner && winner == "green") {

            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney,
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins + 1,
                didBet: user.didBet,
                money: user.money + user.valueBet2 * 14,
                colorBet: null,
                valueBet: null,
                colorBet2: null,
                valueBet2: null
            })
        } else if (user.colorBet == winner) {

            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney,
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins + 1,
                didBet: user.didBet,
                money: user.money + user.valueBet * 2,
                colorBet: null,
                valueBet: null,
                colorBet2: null,
                valueBet2: null
            })

        } else if (user.colorBet2 == winner) {

            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney,
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins + 1,
                didBet: user.didBet,
                money: user.money + user.valueBet2 * 2,
                colorBet: null,
                valueBet: null,
                colorBet2: null,
                valueBet2: null
            })

        } else {
            return user = ({
                id: user.id,
                name: user.name,
                startingMoney: user.startingMoney,
                totalBet: user.totalBet,
                timesBet: user.timesBet,
                totalWins: user.totalWins,
                didBet: user.didBet,
                money: user.money,
                colorBet: null,
                valueBet: null,
                colorBet2: null,
                valueBet2: null
            })
        }
    })

    if (winner.toLowerCase() == "red")
        message.channel.send(`
:red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle:
:red_circle::red_circle::red_circle:  **CZERWONY  WYGRYWA!**  :red_circle::red_circle::red_circle:
:red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle:`)

    else if (winner.toLowerCase() == "black")
        message.channel.send(`
:black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle:
:black_circle::black_circle::black_circle:     **CZARNY   WYGRYWA!**     :black_circle::black_circle::black_circle:
:black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle::black_circle:`)

    else if (winner.toLowerCase() == "green")
        message.channel.send(`
:green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle:
:green_circle::green_circle::green_circle:  **ZIELONY  WYGRYWA!**  :green_circle::green_circle::green_circle:
:green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle::green_circle:`)

    if (whoWon.length > 0) {

        message.channel.send(`
    :trophy: LISTA ZWYCIĘZCÓW: \n ${whoWon.map(user => ` \n **${user.name}** wygrał $**${user.valueBet}**`)}`)

        winnerRed = 0;
        winnerBlack = 0;
        winnerGreen = 0;

        money.users = money.users.map(user => {
            if (user.didBet) {
                return user = ({
                    id: user.id,
                    name: user.name,
                    startingMoney: user.startingMoney,
                    totalBet: user.totalBet,
                    timesBet: user.timesBet + 1,
                    totalWins: user.totalWins,
                    didBet: false,
                    money: user.money,
                    colorBet: user.colorBet,
                    valueBet: user.valueBet,
                    colorBet2: user.colorBet2,
                    valueBet2: user.valueBet2
                })
            } else
                return user
        })
    } else if (whoWon.length <= 0) {
        message.channel.send('BRAK ZWYCIĘZCÓW!')
    }
    else {
        message.channel.send('zwykly fart')
    }

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });

}

module.exports.help = {
    name: "win",
    aliases: ["w"]
}