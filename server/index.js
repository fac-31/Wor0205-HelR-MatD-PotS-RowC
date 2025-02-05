module.exports = function(app, dir) {
    // Define a route for the home page

    app.get('/', (req, res) => {
        res.sendFile(dir + '/public/index.html');
    });
}
