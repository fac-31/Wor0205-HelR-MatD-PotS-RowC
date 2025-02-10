import { extract } from '@extractus/article-extractor'

export async function readFromArticleExtractor(resultsFromG) {
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
