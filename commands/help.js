const { Channel } = require("discord.js")

module.exports.run = async (bot, message, args) => {


    message.channel.send(`
    **Witam w BTG!**

    Jest to prawie typowa ruletka z tym, że wykonana praktycznie w całości przeze mnie. Obstawiacie kolory za pomocą komend, a następnie kretago... ruletagon weryfikuje.
    Musicie wejść, co najmniej połowę (25) razy do beta, łączna ilość punktów, które musicie obstawić musi się równać, co najmniej 50% waszych początkowych punktów (w grze oznaczonych jako $$$ dolary $$$).
    Osoba, która po 50 losowaniach będzie miała najwięcej punktów, wygrywa **100zł PSC**!

    Mnożnik wygranego beta: 
    red/black x 2, 
    green x 14.

    A oto komendy:

    Wpisz **!bet <red/black/green> <liczba/wartość procentowa>**, aby obstawić,
    wpisz **!saldo** lub też **!ile**, **!hajs**, **!kasa** itp. aby sprawdzić posiadaną liczbę punktów, 
    wpisz **!odp <twoja_odpowiedź>** podczas **eventu**, aby odpowiedzieć na pytanie,
    wpisz **!stats**, aby zobaczyć swoje aktualne statystyki

    Powodzenia!

`)
}

module.exports.help = {
    name: "pomoc",
    aliases: ["pomoc", "pomocy", "h"]
}