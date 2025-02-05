const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Require all files in server dir for paths
require('./server/')(app, __dirname);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});