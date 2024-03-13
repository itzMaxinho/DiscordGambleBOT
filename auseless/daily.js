// const Discord = require("discord.js")
// const fs = require("fs")
// const money = require("../money.json")
// const ms = require("parse-ms")
// const cooldowns = require("../cooldowns.json")

// module.exports.run = async (bot, message, args) => {

//     let timeout = 86400000;
//     let reward = 0;

//     let embed = new Discord.RichEmbed();
//     embed.setTitle("Daily reward!");

//     if (!money[message.author.id]) {

//         money[message.author.id] = {
//             name: bot.users.get(message.author.id).tag,
//             money: reward
//         }
//         fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//             if (err) console.log(err);
//         });

//         if (!cooldowns[message.author.id]) {
//             cooldowns[message.author.id] = {
//                 name: bot.users.get(message.author.id).tag,
//                 daily: Date.now()
//             }
//             fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
//                 if (err) console.log(err);
//             });

//         } else {

//             cooldowns[message.author.id].daily = Date.now();
//             fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
//                 if (err) console.log(err);
//             });
//         }

//         embed.setDescription(`Gratulacje, zostałeś maćkiem!`)

//         embed.setColor("00FF00");
//         return message.channel.send(embed)

//     } else {

//         if (!cooldowns[message.author.id]) {
//             cooldowns[message.author.id] = {
//                 name: bot.users.get(message.author.id).tag,
//                 daily: Date.now()
//             }
//             fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
//                 if (err) console.log(err);
//             });

//             money[message.author.id].money += reward;
//             fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//                 if (err) console.log(err);
//             });

//             embed.setDescription(`Gratulacje, zostałeś maćkiem!`)

//             embed.setColor("00FF00");
//             return message.channel.send(embed)

//         } else {

//             if (timeout - (Date.now() - cooldowns[message.author.id].daily) > 0) {

//                 let time = ms(timeout - (Date.now() - cooldowns[message.author.id]));

//                 embed.setColor("FF0000");
//                 embed.setDescription(`you already are maciek`)
//                 embed.addField(`badz mackiem znow za`, `${time.hours}h ${time.minutes}m ${time.seconds}s`);
//                 return message.channel.send(embed);

//             } else {

//                 money[message.author.id].money += reward;
//                 fs.writeFile("./money.json", JSON.stringify(money), (err) => {
//                     if (err) console.log(err);
//                 });

//                 cooldowns[message.author.id].daily = Date.now();
//                 fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
//                     if (err) console.log(err);
//                 });

//                 embed.setDescription(`Gratulacje, zostałeś maćkiem!`)

//                 embed.setColor("00FF00");
//                 return message.channel.send(embed)

//             }

//         }
//     }
// }

// module.exports.help = {
//     name: "daily",
//     aliases: []
// }