import {Client, Events} from "discord.js";
import {GatewayIntentBits} from "discord-api-types/v10";
import {getGmcWikiLinkCommand} from "./commands/GetGmcWikiLinkCommand.js";
import {refreshGmcSearchIndexCacheCommand} from "./commands/RefreshGmcSearchIndexCacheCommand.js";
import {envConfig} from "./config/EnvConfig.js";


const messageSubscribers = [
    getGmcWikiLinkCommand,
    refreshGmcSearchIndexCacheCommand
]

process.on('SIGINT', () => {
    console.info("Interrupted")
    process.exit(0)
});


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once(Events.ClientReady, () => {
    console.log('Ready!')
});

client.on(Events.MessageCreate, message => {
    messageSubscribers.forEach(subscriber => subscriber(message));
});


client.login(envConfig.botToken);
