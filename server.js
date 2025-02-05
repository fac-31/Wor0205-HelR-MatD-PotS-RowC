const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));  // This auto-adds public/index.html to the "/" page
app.use(require("./server/page.js"));
app.use(require("./server/error.js"));


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


// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});