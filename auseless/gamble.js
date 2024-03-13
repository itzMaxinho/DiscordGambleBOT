// const Discord = require("discord.js")
// const money = require("../money.json")
// const fs = require("fs")

// module.exports.run = async (bot, message, args) => {

//     var maxBet = 50000;

//     if (!money[message.author.id] || money[message.author.id].money <= 0) return message.reply("you dont have any money");

//     if (!args[0]) return message.reply("please specify a bet");

//     if (args[0].toLowerCase() == "all") args[0] = money[message.author.id].money;

//     try {
//         var bet = parseFloat(args[0]);
//     } catch {
//         return message.reply("you can only enter whole numbers");
//     }

//     if (bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

//     if (money[message.author.id].money < bet) return message.reply("you dont have that much money.");

//     if (bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}.`);

//     let chances = ["win", "lose"];
//     var pick = chances[Math.floor(Math.random() * chances.length)];

//     if (pick == "lose") {
//         money[message.author.id].money -= bet;
//         fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//             if (err) console.log(err);
//         });
//         return message.reply(`you lose. New balance: ${money[message.author.id].money}`);
//     } else {

//         money[message.author.id].money += bet;
//         fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//             if (err) console.log(err);
//         });
//         return message.reply(`you win. New balance: ${money[message.author.id].money}`);

//     }

// }

// module.exports.help = {
//     name: "gamble",
//     aliases: []
// }