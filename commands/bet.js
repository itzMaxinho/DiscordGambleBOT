const money = require("../money.json");
const fs = require("fs");
const win = require("./win.js");
const trigger = require("../isOpen.json")

module.exports.run = async (bot, message, args) => {

    let check = false;
    let color = args[0];
    let value = args[1];
    let allIn = false;

    if (trigger.isOpen) {

        // sprawdzenie czy user wpisal liczbe coinow
        if (!args[1])
            return message.reply("wprowadź liczbę punktów, którą chcesz dodać (np. !bet red 100).");

        // obstawienie all in
        if (args[1].toLowerCase() == "all") {

            allIn = true;
            args[1] = money.users.filter(user => user.id == [message.author.id])[0].money;
            //money.users.filter(user => user.id == [message.author.id])[0].money = 0;

            if (!args[1] > 0) {
                return message.reply("nie masz już punktów. Przegrałeś :SADGE:");
            }
        }

        // obstawianie procentowe
        if (args[1] == (parseFloat(args[1]) + "%")) {

            let cutInt = parseFloat(args[1].toString().substring(0, args[1].toString().length - 1));
            args[1] = Math.floor(cutInt);

            let percent = args[1] * 0.01;
            percentBet = money.users.filter(user => user.id == [message.author.id])[0].money * percent;
            args[1] = parseInt(percentBet);
        }

        // sprawdzenie czy jest liczbą
        if (args[1] != Math.floor(args[1]))
            return message.reply("wprowadziłeś niepoprawną wartość liczbową.");

        // sprawdzenie czy user posiada pieniadze (useless)
        if (money.users.filter(user2 => user2.id == [message.author.id]).money)
            return message.reply("nie masz jeszcze konta, zawołaj admina");

        // sprawdzenie czy user posiada pieniadze (useless)
        if (!money.users.filter(user => user.id == [message.author.id])[0].money)
            return message.reply("nie masz już punktów. Przegrałeś :SADGE:");

        // sprawdzenie czy user ma tyle pieniedzy ile chce przelac
        if (parseInt(args[1]) > money.users.filter(user => user.id == [message.author.id])[0].money)
            return message.reply("nie masz aż tylu punktów, żeby to wprowadzić.");

        //sprawdzenie czy kwota przelewu jest dodatnia i nie rowna zeru
        if (parseInt(args[1]) < 1) {
            message.reply("wartość, którą chcesz wprowadzić nie może być ujemna ani równa kretu.");
            return message.channel.send("sorry, miało być *zeru* *")
        }

        money.users = money.users.map(user => {
            if (user.id == [message.author.id]) {

                if (user.colorBet == null) {
                    return user = ({
                        id: user.id,
                        name: user.name,
                        startingMoney: user.startingMoney,
                        totalBet: user.totalBet + parseInt(args[1]),
                        timesBet: user.timesBet,
                        totalWins: user.totalWins,
                        didBet: true,
                        money: user.money - parseInt(args[1]),
                        colorBet: args[0],
                        valueBet: parseInt(args[1]),
                        colorBet2: user.colorBet2,
                        valueBet2: user.valueBet2
                    })

                } else if ((user.colorBet != args[0] && user.colorBet2 != args[0]) && (user.colorBet != null && user.colorBet2 != null)) {
                    check = true;
                    return user

                } else if (user.colorBet != null && user.valueBet2 != null && user.colorBet != args[0]) {
                    return user = ({
                        id: user.id,
                        name: user.name,
                        startingMoney: user.startingMoney,
                        totalBet: user.totalBet + parseInt(args[1]),
                        timesBet: user.timesBet,
                        totalWins: user.totalWins,
                        didBet: true,
                        money: user.money - parseInt(args[1]),
                        colorBet: user.colorBet,
                        valueBet: user.valueBet,
                        colorBet2: args[0],
                        valueBet2: user.valueBet2 + parseInt(args[1])
                    })

                } else if (user.colorBet != null && user.colorBet != args[0]) {
                    return user = ({
                        id: user.id,
                        name: user.name,
                        startingMoney: user.startingMoney,
                        totalBet: user.totalBet + parseInt(args[1]),
                        timesBet: user.timesBet,
                        totalWins: user.totalWins,
                        didBet: true,
                        money: user.money - parseInt(args[1]),
                        colorBet: user.colorBet,
                        valueBet: user.valueBet,
                        colorBet2: args[0],
                        valueBet2: parseInt(args[1])
                    })
                }

                else if (user.colorBet != null && user.colorBet == args[0]) {
                    return user = ({
                        id: user.id,
                        name: user.name,
                        startingMoney: user.startingMoney,
                        totalBet: user.totalBet + parseInt(args[1]),
                        timesBet: user.timesBet,
                        totalWins: user.totalWins,
                        didBet: true,
                        money: user.money - parseInt(args[1]),
                        colorBet: user.colorBet,
                        valueBet: user.valueBet + parseInt(args[1]),
                        colorBet2: user.colorBet2,
                        valueBet2: user.valueBet2
                    })
                }
            }
            else {
                return user
            }
        })

        money.users[message.author.id] -= parseInt(value);

        if (!check) {

            if (color.toLowerCase() == "red" /*|| los == "lewo"*/) {

                if (allIn && args[1] > 999) {

                    message.reply(`__wchodzi **ALL IN** (${args[1]}) na **CZERWONY**! :red_circle:__`)

                } else {

                    //args[0] = "prawo"
                    message.reply(`postawił **${args[1]}** punktów na **CZERWONY**! :red_circle:`)
                }

            } else if (color.toLowerCase() == "black" /*|| los == "prawo"*/) {

                if (allIn && args[1] > 999) {

                    message.reply(`__wchodzi **ALL IN** (${args[1]}) na **CZARNY**! :black_circle:__`)

                } else {
                    //args[0] = "prawo"
                    message.reply(`postawił **${args[1]}** punktów na **CZARNY**! :black_circle:`)
                }

            } else if (color.toLowerCase() == "green" /*|| los == "prosto"*/) {

                if (allIn && args[1] > 999) {

                    message.reply(`__wchodzi **ALL IN** (${args[1]}) na **ZIELONY**! :green_circle:__`)

                } else {
                    //args[0] = "prosto"
                    message.reply(`postawił **${args[1]}** punktów na **ZIELONY**! :green_circle:`)
                }

            } else {
                console.log(color)
                return message.reply("wprowadź jeden z następujących kolorów: red / black / green.")
            }

        } else if (check) {
            return message.reply('możesz obstawić tylko dwa kolory na turę.')
        }

        // zapis do money.json
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

    } else {

        return message.channel.send("// Kolejka jest aktualnie zamknięta.")

    }
}

module.exports.help = {
    name: "bet",
    aliases: ["bet"]
}