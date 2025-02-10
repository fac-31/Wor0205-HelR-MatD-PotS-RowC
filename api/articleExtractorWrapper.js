import { extract } from '@extractus/article-extractor'

export async function readFromArticleExtractor(resultsFromG) {
    if (resultsFromG.response.results == null || resultsFromG.response.results.length == 0)
        return "";
    return await resultsFromG.response.results.reduce(
        async (acc, curr) => {
            const webUrl = curr.webUrl;
            const articleWithTags = await extract(webUrl);
            let articleText = "";
            if (articleWithTags != null) {
                const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
                articleText = articleWithTags.content.replace(regex, '');
            }
            return await acc + articleText;
        }
    );
}
