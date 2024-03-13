const money = require("../money.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    money.users = money.users.map(user => {

        if (user.id == message.author.id) {

            if ((user.totalBet >= user.startingMoney / 2) && (user.timesBet >= 25)) {
                message.reply(`twoje statystyki w tej edycji: \n :moneybag: Twoje punkty na start: $**${user.startingMoney}** \n :money_with_wings: Punkty obstawione do tej pory: $**${user.totalBet}**/$**${user.startingMoney / 2}** (:white_check_mark:)\n :repeat_one: Ilość kolejek, w których obstawiłeś: **${user.timesBet}**/**25** (:white_check_mark:) \n :green_heart: Wygrane bety: **${user.totalWins}** \n :broken_heart: Przegrane bety: **${user.timesBet - user.totalWins}** \n :coin: Aktualna ilość punktów: $**${user.money}**`)
                return user

            } else if ((user.totalBet < user.startingMoney / 2) && (user.timesBet >= 25)) {
                message.reply(`twoje statystyki w tej edycji: \n :moneybag: Twoje punkty na start: $**${user.startingMoney}** \n :money_with_wings: Punkty obstawione do tej pory: $**${user.totalBet}**/$**${user.startingMoney / 2}** (:x:)\n :repeat_one: Ilość kolejek, w których obstawiłeś: **${user.timesBet}**/**25** (:white_check_mark:) \n :green_heart: Wygrane bety: **${user.totalWins}** \n :broken_heart: Przegrane bety: **${user.timesBet - user.totalWins}** \n :coin: Aktualna ilość punktów: $**${user.money}**`)
                return user

            } else if ((user.totalBet >= user.startingMoney / 2) && (user.timesBet < 25)) {
                message.reply(`twoje statystyki w tej edycji: \n :moneybag: Twoje punkty na start: $**${user.startingMoney}** \n :money_with_wings: Punkty obstawione do tej pory: $**${user.totalBet}**/$**${user.startingMoney / 2}** (:white_check_mark:)\n :repeat_one: Ilość kolejek, w których obstawiłeś: **${user.timesBet}**/**25** (:x:) \n :green_heart: Wygrane bety: **${user.totalWins}** \n :broken_heart: Przegrane bety: **${user.timesBet - user.totalWins}** \n :coin: Aktualna ilość punktów: $**${user.money}**`)
                return user

            } else if ((user.totalBet < user.startingMoney / 2) && (user.timesBet < 25)) {
                message.reply(`twoje statystyki w tej edycji: \n :moneybag: Twoje punkty na start: $**${user.startingMoney}** \n :money_with_wings: Punkty obstawione do tej pory: $**${user.totalBet}**/$**${user.startingMoney / 2}** (:x:)\n :repeat_one: Ilość kolejek, w których obstawiłeś: **${user.timesBet}**/**25** (:x:) \n :green_heart: Wygrane bety: **${user.totalWins}** \n :broken_heart: Przegrane bety: **${user.timesBet - user.totalWins}** \n :coin: Aktualna ilość punktów: $**${user.money}**`)
                return user

            } else {
                message.reply(`error`)
                return user
            }
        } else {
            return user
        }
    })

}

module.exports.help = {
    name: "stats",
    aliases: ["s", "stats", "staty", "stat"]
}