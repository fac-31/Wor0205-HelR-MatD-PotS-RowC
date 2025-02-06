const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodie
const PORT = process.env.PORT || 3000;


function function1(id, reps)
{
    let concat = "";
    for(let i = 0;i<reps;i++)
    {
        concat+= "<h1> " + id + "</h1>";
    }
    return concat;
}

app.get(`/function1/:id/:reps`, (req, res) => {

    var concat = function1(req.params.id,req.params.reps );
    res.send(concat);
})

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
    const url = resultsFromG.response.results[0].webUrl;
    console.log(resultsFromG.response.results[0].webUrl);

    let input = await fetch('https://us-central1-technews-251304.cloudfunctions.net/article-parser?url=' + url);
    let article = await input.json()['data']['content'];

    

    //API2 goes here.
    //use the output of API1



    //result of API2 goes here
    //return to client

    // Return a confirmation message with the list of all people
    //res.json({ message: `Topic ${topic}` });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});