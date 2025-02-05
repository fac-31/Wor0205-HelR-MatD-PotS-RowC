const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/:page',(req, res, next) => {
    res.sendFile(__dirname + `/${req.params.page}/index.html`, {}, (err) => {
        if (err) {
            console.log(err);
            console.log("bong");
            next();
        } else {
            console.log("page found");
        }
    });
});

app.get('/*',(req, res, next) => {
    res.sendFile(__dirname + '/not_found/error.html');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});