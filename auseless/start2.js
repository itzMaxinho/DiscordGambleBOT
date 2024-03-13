let zmienna;

module.exports.run = async (bot, message, args) => {

    zmienna = 50;
    zmienna += 25;
    console.log("ustawienie zmiennej na " + zmienna)
    return zmienna;
}

module.exports = { zmienna }

module.exports.help = {
    name: "start",
    aliases: ["s"]
}