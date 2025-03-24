import {Message} from "discord.js";
import {getArgs, isPrefixed, sendReply} from "../utils/MessageUtil.js";
import {GmcWikiLinkService} from "../service/GmcWikiLinkService.js";

export const getGmcWikiLinkCommand = async (message: Message) => {
    if (!isPrefixed(message, "gmc")) return;

    const payload = getArgs(message)
    const result = await GmcWikiLinkService.findMatchingArticleByPayload(payload);

    const responseMessage = result.success ? result.formattedUrl : result.reason;
    sendReply(message, responseMessage);
}
