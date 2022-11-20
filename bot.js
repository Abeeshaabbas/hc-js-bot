const colors = require('colors');
const aoijs = require("aoi.js");

const bot = new aoijs.Bot({
    token: require('./config.json').token,
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    prefix: "$getVar[prefix]"
})
bot.onMessage();
bot.variables({
    "prefix": ","
})
const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./commands/")
const fs = require('fs');
const commandDir = fs.readdirSync('./commands');
console.log("Command | Status".blue);
let num = 0;
for(let commandInDir of commandDir) {
    const commandFolder = fs.readdirSync('./commands/'+commandInDir).filter(h => h.endsWith('.js'));
    for(let commandFile of commandFolder) {
        const command = require(`./commands/${commandInDir}/${commandFile}`);
        console.log(command.name+" Loaded!".green)
        num++;
    }
}
console.log(`${num} Commands Loaded!`.blue)
bot.readyCommand({
    channel: '',
    code: `$log[${`Ready On $userTag[$clientID]!`.green}]`
})