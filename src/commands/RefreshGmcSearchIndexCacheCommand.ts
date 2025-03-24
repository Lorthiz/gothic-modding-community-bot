import {Message} from "discord.js";
import {isPrefixed, sendReply} from "../utils/MessageUtil.js";
import {refreshSearchIndexCache} from "../utils/GmcWikiApi.js";

let lastExecutedOn = 0;
const FIVE_MINUTES = 300000;

const formatMillis = (millis: number) => {
    return `${Math.floor(millis / 60000)}m ${((millis % 60000) / 1000).toFixed(0)}s`
}

export const refreshGmcSearchIndexCacheCommand = async (message: Message) => {
    if (!isPrefixed(message, "ref")) return;

    const timeSinceLastCall = Date.now() - lastExecutedOn;
    if (timeSinceLastCall > FIVE_MINUTES) {
        await refreshSearchIndexCache()
        lastExecutedOn = Date.now();
        sendReply(message, `Cache refreshed!`)
    } else {
        sendReply(message, `Cache refresh just triggered! ${formatMillis(FIVE_MINUTES - timeSinceLastCall)} until command will be active again.`)
    }
}
