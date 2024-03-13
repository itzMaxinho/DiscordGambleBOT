// const money = require("../money.json");
// const fs = require("fs");

// module.exports.run = async (bot, message, args) => {

//     // zadeklarowanie user jako @mention lub pierwszy argument
//     let user = message.mentions.users.first() || bot.users.get(args[0]);

//     //sprawdzenie czy user zostal poprawnie oznaczony
//     if (!user) return message.reply("sorry, nie mozna znalezc takiej osoby");

//     // sprawdzenie czy user wpisal liczbe coinow
//     if (!args[1]) return message.reply("okresl ile chcesz dac chlopu");

//     // sprawdzenie czy user posiada pieniadze (useless)
//     if (!money[message.author.id].money) return message.reply("sorry, nie masz kasy");

//     // sprawdzenie czy user chce przelac coiny sam sobie
//     if (user.id === message.author.id) return message.reply("u cant pay urself bro");

//     // sprawdzenie czy user ma tyle pieniedzy ile chce przelac
//     if (parseInt(args[1]) > money[message.author.id].money) return message.reply("nie masz az tyle kasy byq");

//     //sprawdzenie czy kwota przelewu jest dodatnia i nie rowna zeru
//     if (parseInt(args[1]) < 1) return message.reply("nie mozesz placic mniej niz zeroooooo");

//     //
//     //sprawdzenie czy user posiada konto
//     if (!money[user.id]) {

//         money[user.id] = {
//             id: [user.id],
//             name: bot.users.get(user.id).tag,
//             money: parseInt(args[1])
//         }

//         money[message.author.id].money -= parseInt(args[1]);

//         // zapis do money.json
//         fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//             if (err) console.log(err);
//         });

//     } else {

//         // przelew poszedl na konto usera
//         money[user.id].money += parseInt(args[1]);

//         // coiny zabrane za przelew
//         money[message.author.id].money -= parseInt(args[1]);

//         // zapis do money.json
//         fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//             if (err) console.log(err);
//         })
//     }

//     return message.channel.send(`${message.author.username} paid $${args[1]} to ${bot.users.get(user.id).username}`);
// }

// module.exports.help = {
//     name: "fadsfasdgasdf",
//     aliases: []
// }