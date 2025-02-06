import express from 'express';
import { getWordCloud } from "./api/wordcloud.js";
const app = express();
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
  // This auto-adds public/index.html to the "/" page
//app.use(require("./server/page.js"));
//app.use(require("./server/error.js"));

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});