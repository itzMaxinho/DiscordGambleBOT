const answer = require("../isAnswer.json")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (message.author.id == "adminID") {
    } else
        return message.reply("nie masz uprawnień")

    message.channel.send(`:warning: **WŁAŚNIE ROZPOCZĄŁ SIĘ EVENT!** :warning: 
    \nODPOWIEDZ JAKO PIERWSZY NA PYTANIE I ZGARNIJ **$1000**
    \nŻeby odpowiedzieć wpisz **!odp <wynik>**. Pytanie: **Ile wynosi x?**
    \n`)

    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);
    let r3 = Math.floor(Math.random() * 10);
    let r4 = Math.floor(Math.random() * 10);
    let r5 = Math.floor(Math.random() * 10);

    message.channel.send(`x = ${r1} + ${r2} * ${r3} - ${r4} * ${r5}`)

    answer.isAnswer = r1 + r2 * r3 - r4 * r5

    fs.writeFile("./isAnswer.json", JSON.stringify(answer), (err) => {
        if (err) console.log(err);
    });

}

module.exports.help = {
    name: "even",
    aliases: ["e", "event"]
}