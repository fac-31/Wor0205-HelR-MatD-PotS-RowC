import express from 'express';
import { extract } from '@extractus/article-extractor'
import "dotenv/config.js"
import { getWordCloud } from "./api/wordcloud.js"
const app = express();
app.use(express.json()); // Middleware to parse JSON bodie
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let input = 'Hello my name name name is is john and I have hello seven words words words words words words to say';

const path = 'https://quickchart.io/wordcloud';

app.get('/wordcloud', async (req,res) => {
    const blob = await getWordCloud(path,input);
    console.log(blob);
    res.send(URL.createObjectURL(blob))
})

// function function1(id, reps)
// {
//     let concat = "";
//     for(let i = 0;i<reps;i++)
//     {
//         concat+= "<h1> " + id + "</h1>";
//     }
//     return concat;
// }

// app.get(`/function1/:id/:reps`, (req, res) => {

//     var concat = function1(req.params.id,req.params.reps );
//     res.send(concat);
// })

// Serve static files from the "public" directory
app.use(express.static('public'));  // This auto-adds public/index.html to the "/" page
//app.use(require("./server/page.js"));
//app.use(require("./server/error.js"));

 app.post('/API1', async (req, res) => {
    //console.log(res);
    const jsonObject = req.body;  // Access fields directly after parsing the JSON body

    //console.log(typeof(jsonObject));


    //console.log(`requested receive with Topic ${jsonObject}`);
    //API1 goes here.
    //use the parameter topic

    let str = jsonObject["topic"];
    let httpStrToGuardian = "https://content.guardianapis.com/search?q=" + str + "&from-date=2014-01-01&api-key=" + process.env.GUARDIAN_API_KEY;

    //console.log(httpStrToGuardian);
    const responseFromGuardian = await fetch(httpStrToGuardian);

    let urlForAPi2 = responseFromGuardian;
    //console.log(urlForAPi2);


    let resultsFromG = await responseFromGuardian.json();

    // THIS IS WHAT WE WANT
    let article;
    const url = resultsFromG.response.results[0].webUrl;
    //console.log(resultsFromG.response.results[0].webUrl);

    try {
        article = await extract(url)
      } catch (err) {
        console.error(err)
      }

    //console.log(article);

    

    //API2 goes here.
    //use the output of API1
    const path = 'https://quickchart.io/wordcloud';
    const cloudResponse = await getWordCloud(path,article);
    //console.log(URL.createObjectURL(blob));
    const cloudUrl = URL.createObjectURL(cloudResponse);
    //console.log(URL.createObjectURL(blob))
    res.send(cloudUrl)




    //result of API2 goes here
    //return to client

    // Return a confirmation message with the list of all people
    //res.json({ message: `Topic ${topic}` });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});