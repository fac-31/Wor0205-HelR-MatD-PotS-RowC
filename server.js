import express from 'express'

import 'dotenv/config.js'
import { getWordCloud } from './api/wordcloudAPIWrapper.js'
import { readFromGuardian } from './api/guardianAPIWrapper.js'
import { readFromArticleExtractor } from './api/articleExtractorWrapper.js'
const __dirname = import.meta.dirname

const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000

// Serve static files from the "public" directory
app.use(express.static('public')) // This auto-adds public/index.html to the "/" page

// app.get(`/wordcloud`, (req, res) => {

//     res.sendFile(__dirname + '/public/wordcloud.html');
// })

//app.use(require("./server/page.js"));
//app.use(require("./server/error.js"));

// Red's code commented out below to test Claude's
// app.post('/API1', async (req, res) => {

//     const jsonObject = req.body;  // Access fields directly after parsing the JSON body

//     //API1 (Guardian) goes here.
//     // use the parameter topic
//     let str = jsonObject["topic"];
//     let excludeTopicFromCloud = true;
//     let httpStrToGuardian = "https://content.guardianapis.com/search?q=" + str + "&from-date=2014-01-01&api-key=" + process.env.GUARDIAN_API_KEY;
//     const responseFromGuardian = await fetch(httpStrToGuardian);
//     let resultsFromG = await responseFromGuardian.json();

//     // Article-Extractor pulls text from the top 10 articles urls
//     //   Uses regex to remove html tags
//     //   reduce() function concatenates the texts together
//     let wordcloudInput = await resultsFromG.response.results.reduce(
//         async (acc, curr) => {
//             const webUrl = curr.webUrl;
//             const articleWithTags = await extract(webUrl);
//             const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
//             const articleText = articleWithTags.content.replace(regex,'');
//             return await acc + articleText;
//         },''
//     )

//     wordcloudInput = (excludeTopicFromCloud ? wordcloudInput.replace(str,'') : wordcloudInput);

//     // Third API - Quick Charts Word Cloud API
//     //   Takes the concatenated text of all 10 articles as its input
//     //   Calls the getWordCloud function in api/wordcloud.js
//     //   Sets the response type to PNG
//     //   Sends word cloud img
//     try {
//         const path = 'https://quickchart.io/wordcloud';
//         const cloud =  await getWordCloud(path,wordcloudInput);
//         res.set('Content-Type', 'image/png');
//         res.send(cloud);
//     } catch (err) {
//         console.error(err)
//     }
// });
//Claude's suggestion to test:
app.post('/API1', async (req, res) => {
  const jsonObject = req.body // Access fields directly after parsing the JSON body

  //1. API1: read webURLs from guardian based on the search string.
  let resultsFromG = await readFromGuardian(jsonObject)

  //2. AP2: read articles body based on webURLs
  let wordcloudInput = await readFromArticleExtractor(resultsFromG)

  if (wordcloudInput.length == 0) {
    wordcloudInput = 'NoneFound'
  }

  //wordcloudInput = (excludeTopicFromCloud ? wordcloudInput.replace(str,'') : wordcloudInput);

  //3. read blob from word cloud based on words from API2
  try {
    const path = 'https://quickchart.io/wordcloud'
    const cloud = await getWordCloud(path, wordcloudInput)
    res.set('Content-Type', 'image/png')
    res.send(cloud)
  } catch (err) {
    console.error(err)
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
