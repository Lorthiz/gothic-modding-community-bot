import {fetchSearchIndexWithCache, SearchIndexRecord} from "../utils/GmcWikiApi.js";

interface GmcFindLinkSuccess {
    success: true;
    searchIndexRecord: SearchIndexRecord,
    formattedUrl: string;
}

interface GmcFindLinkError {
    success: false;
    reason: string;
}

type GmcFindLinkResponse = GmcFindLinkSuccess | GmcFindLinkError

export class GmcWikiLinkService {
    public static async findMatchingArticleByPayload(payload: string): Promise<GmcFindLinkResponse> {
        const searchIndex = await fetchSearchIndexWithCache()
        const searchRecord = searchIndex.docs.find(item => item.title.toLowerCase().indexOf(payload.toLowerCase()) !== -1)
        return this.prepareResponse(payload, searchRecord);
    }

    private static prepareResponse = (payload: string, searchRecord?: SearchIndexRecord): GmcFindLinkResponse => {
        return searchRecord ? {
            success: true,
            searchIndexRecord: searchRecord,
            formattedUrl: `https://gothic-modding-community.github.io/gmc/${searchRecord.location}`

        } : {
            success: false,
            reason: `Did not find any page for query: ${payload}`
        }
    }
}