const money = require(`../money.json`)
const fs = require(`fs`)

module.exports.run = async (bot, message, args) => {

    message.channel.send(`**ZACZYNAMY GRĘ!!!**`)

    money.users = money.users.map(user => {

        console.log("--------ZEROWANIE KONT-------")
        return user = ({
            id: user.id,
            name: user.name,
            startingMoney: 0,
            totalBet: 0,
            timesBet: 0,
            totalWins: 0,
            didBet: null,
            money: 0,
            colorBet: null,
            valueBet: null,
            colorBet2: null,
            valueBet2: null
        })
    })

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`Proszę rozdać graczom punkty.`)
}

module.exports.help = {
    name: "start",
    aliases: ["start"]
}
