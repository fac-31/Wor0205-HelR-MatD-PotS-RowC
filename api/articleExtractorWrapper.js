// import { extract } from '@extractus/article-extractor'

// export async function readFromArticleExtractor(resultsFromG) {
//     if (resultsFromG.response.results == null || resultsFromG.response.results.length == 0)
//         return "";
//     return await resultsFromG.response.results.reduce(
//         async (acc, curr) => {
//             const webUrl = curr.webUrl;
//             const articleWithTags = await extract(webUrl);
//             let articleText = "";
//             if (articleWithTags != null) {
//                 const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
//                 articleText = articleWithTags.content.replace(regex, '');
//             }
//             return await acc + articleText;
//         }
//     );
// }

import { extract } from '@extractus/article-extractor'

export async function readFromArticleExtractor(resultsFromG) {
  try {
    const results = resultsFromG.response.results
    if (!results?.length) {
      return ''
    }

    // Process articles in parallel for better performance
    const articleTexts = await Promise.all(
      results.slice(0, 10).map(async (article) => {
        try {
          const articleWithTags = await extract(article.webUrl)
          if (!articleWithTags?.content) return ''

          const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
          return articleWithTags.content.replace(regex, '')
        } catch (error) {
          console.error(`Error extracting article: ${article.webUrl}`, error)
          return ''
        }
      })
    )

    return articleTexts.join(' ')
  } catch (error) {
    console.error('Article extraction error:', error)
    throw error
  }
}
