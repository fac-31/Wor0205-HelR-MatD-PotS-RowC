import express from 'express';
import { extract } from '@extractus/article-extractor'
import "dotenv/config.js"
import { getWordCloud } from "./api/wordcloud.js"
import { readFromGuardian } from "./api/guardianAPIWrapper.js"
const __dirname = import.meta.dirname;

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));  // This auto-adds public/index.html to the "/" page

app.get(`/wordcloud`, (req, res) => {

    res.sendFile(__dirname + '/public/wordcloud.html');
})

//app.use(require("./server/page.js"));
//app.use(require("./server/error.js"));

app.post('/API1', async (req, res) => {

    const jsonObject = req.body;  // Access fields directly after parsing the JSON body

    let resultsFromG = await readFromGuardian(jsonObject);

    // Article-Extractor pulls text from the top 10 articles urls
    //   Uses regex to remove html tags
    //   reduce() function concatenates the texts together
    let wordcloudInput = await resultsFromG.response.results.reduce(
        async (acc, curr) => {
            const webUrl = curr.webUrl;
            const articleWithTags = await extract(webUrl);
            let articleText = "";
            if (articleWithTags != null)
            {
                const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
                articleText = articleWithTags.content.replace(regex,'');
            }
            return await acc + articleText;
        }
    )
    
    if (wordcloudInput.length == 0)
    {
        wordcloudInput = "NoneFound";
    }

    //wordcloudInput = (excludeTopicFromCloud ? wordcloudInput.replace(str,'') : wordcloudInput);


    // Third API - Quick Charts Word Cloud API
    //   Takes the concatenated text of all 10 articles as its input
    //   Calls the getWordCloud function in api/wordcloud.js
    //   Sets the response type to PNG
    //   Sends word cloud img
    try {
        const path = 'https://quickchart.io/wordcloud';
        const cloud =  await getWordCloud(path,wordcloudInput);
        res.set('Content-Type', 'image/png');
        res.send(cloud);
    } catch (err) {
        console.error(err)
    }
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


