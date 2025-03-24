import {Message} from "discord.js";
import {isPrefixed} from "../utils/MessageUtil.js";
import {refreshSearchIndexCache} from "../utils/GmcWikiApi.js";

export const refreshGmcSearchIndexCacheCommand = async (message: Message) => {
    if (!isPrefixed(message, "ref")) return;
    await refreshSearchIndexCache()

    if (!message.channel.isSendable()) return;
    message.channel.send(`Cache refreshed!`)
}
