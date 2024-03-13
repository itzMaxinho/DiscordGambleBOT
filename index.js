//const path = require('path')
const Discord = require('discord.js')
const bot = new Discord.Client({ intents: ["GUILD_MEMBERS"] })
const botconfig = require('./botconfig.json')
const fs = require('fs')
const trigger = require('./isOpen.json')
//const privateMessage = require('./private-message')

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()


// red commands folder
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("nie mozna znalezc komend");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

// bot online message and activity message
bot.on('ready', () => {
    console.log(`${bot.user.username} is ready on ${bot.guilds.size} servers!`);

    //privateMessage(bot, 'ping', 'pong!')
    // bot.users.get('227843270049398784').then(user => {
    //     user.send('hello kurwa')
    // })

    bot.user.setActivity(`Pisz !pomocy Maćku`);
    trigger.isOpen = false;

})

bot.on("message", async message => {

    // check channel type
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    //set prefix
    let prefix = botconfig.prefix;

    //check prefix, define args and command
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args);

    // rund commands
    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
})

bot.login(botconfig.token)
