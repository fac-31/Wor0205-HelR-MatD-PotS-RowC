import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config.js'
import { readFromGuardian } from './api/guardianAPIWrapper.js'
import { readFromArticleExtractor } from './api/articleExtractorWrapper.js'
import { getWordCloud } from './api/wordcloudAPIWrapper.js'
import { getBlurb } from './api/openaiAPIWrapper.js';
const __dirname = import.meta.dirname

const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Serve static files from the "public" directory
app.use(express.static('public')) // This auto-adds public/index.html to the "/" page

app.post('/API1', async (req, res) => {
    const jsonObject = req.body
    const topic = jsonObject['topic'] // Access fields directly after parsing the JSON body
    //delete jsonObject['topic']; // Remove uneeded key topic
  
    //1. API1: read webURLs from guardian based on the search string.
    let resultsFromG = await readFromGuardian(topic)
    // if (!req.body.topic) {
    //   return res.status(400).json({ error: 'Topic is required' })
    // }

    // const resultsFromG = await readFromGuardian(req.body)
    //2. AP2: read articles body based on webURLs
    let wordcloudInput = await readFromArticleExtractor(resultsFromG)

    if (wordcloudInput.length == 0) {
        wordcloudInput = 'NoneFound'
    }

    //wordcloudInput = (excludeTopicFromCloud ? wordcloudInput.replace(str,'') : wordcloudInput);

    //3. read blob from word cloud based on words from API2
    try {
        const PATH = 'https://quickchart.io/wordcloud'
        const cloud = await getWordCloud(PATH, wordcloudInput, jsonObject)
        res.set('Content-Type', 'image/png')
        res.send(cloud)
    } catch (err) {
        console.error(err)
    }
})

app.post('/poem', async (req, res) => {
    const jsonObject = req.body;
    let topic = jsonObject['topic'];
    topic = topic.replace(' ',', ');
    const openai_res = await getBlurb(client,topic);
    res.send(openai_res);
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
