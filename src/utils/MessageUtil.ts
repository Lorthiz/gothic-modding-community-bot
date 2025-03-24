import {Message} from "discord.js";
import {envConfig} from "../config/EnvConfig.js";


export const isPrefixed = (message: Message, word: string) => {
    const mes = message.content.toLowerCase();
    return mes.startsWith(`${envConfig.botPrefix}${word}`)
}

export const getArgs = (message: Message) => {
    const firstEmptySpace = message.content.indexOf(" ");
    return message.content.substring(firstEmptySpace + 1)
}

export const sendReply = (message: Message, reply: string) => {
    if (!message.channel.isSendable()) return;
   message.channel.send(reply);
}