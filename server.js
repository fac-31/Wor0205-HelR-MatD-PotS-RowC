import express from 'express'
import { extract } from '@extractus/article-extractor'
import 'dotenv/config.js'
import { getWordCloud } from './api/wordcloud.js'
const __dirname = import.meta.dirname

const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000

// Serve static files from the "public" directory
app.use(express.static('public')) // This auto-adds public/index.html to the "/" page

app.get(`/wordcloud`, (req, res) => {
  res.sendFile(__dirname + '/public/wordcloud.html')
})

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
  try {
    // Input validation
    if (!req.body.topic || typeof req.body.topic !== 'string') {
      return res.status(400).json({ error: 'Invalid topic' })
    }

    const topic = encodeURIComponent(req.body.topic)
    const excludeTopicFromCloud = true

    // Construct Guardian API URL
    const guardianUrl = new URL('https://content.guardianapis.com/search')
    guardianUrl.searchParams.append('q', topic)
    guardianUrl.searchParams.append('from-date', '2014-01-01')
    guardianUrl.searchParams.append('api-key', process.env.GUARDIAN_API_KEY)

    // Fetch from Guardian API
    const responseFromGuardian = await fetch(guardianUrl.toString())
    if (!responseFromGuardian.ok) {
      throw new Error(`Guardian API error: ${responseFromGuardian.status}`)
    }
    const resultsFromG = await responseFromGuardian.json()

    // Process articles in parallel
    const articles = resultsFromG.response.results.slice(0, 10)
    const articleTexts = await Promise.all(
      articles.map(async (article) => {
        const articleWithTags = await extract(article.webUrl)
        const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
        return articleWithTags.content.replace(regex, '')
      })
    )

    let wordcloudInput = articleTexts.join('')
    if (excludeTopicFromCloud) {
      wordcloudInput = wordcloudInput.replace(new RegExp(topic, 'gi'), '')
    }

    // Generate word cloud
    const path = 'https://quickchart.io/wordcloud'
    const cloud = await getWordCloud(path, wordcloudInput)
    res.set('Content-Type', 'image/png')
    res.send(cloud)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
