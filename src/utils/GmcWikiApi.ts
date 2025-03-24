export interface SearchIndexConfig {
    lang: string[];
    separator: string;
    pipeline: string[]
}

export interface SearchIndexRecord {
    location: string
    title: string
    text: string
}

export interface SearchIndex {
    config: SearchIndexConfig;
    docs: SearchIndexRecord[]
}

export interface SearchIndexCache {
    searchIndex: SearchIndex;
    timestamp: number
}

const ONE_DAY = 86400000;


export const fetchSearchIndex = async (): Promise<SearchIndex> => {
    const URL = `https://gothic-modding-community.github.io/gmc/search/search_index.json`

    return fetch(URL)
        .then(res => res.json())
}

let searchIndexCachedData: SearchIndexCache | undefined = undefined;

export const refreshSearchIndexCache = async () => {
    searchIndexCachedData = {
        searchIndex: await fetchSearchIndex(),
        timestamp: Date.now()
    }
}

export const fetchSearchIndexWithCache = async (): Promise<SearchIndex> => {
    const isCacheOlderThanOneDay = () => Date.now() - searchIndexCachedData!.timestamp > ONE_DAY

    if (!searchIndexCachedData || isCacheOlderThanOneDay()) {
        await refreshSearchIndexCache();
    }

    return searchIndexCachedData?.searchIndex!;
}


