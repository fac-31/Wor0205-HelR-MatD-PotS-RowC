const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/:page',(req, res, next) => {
    res.sendFile(path.join(__dirname, '..', `/${req.params.page}/index.html`), {}, (err) => {
        if (err) {
            console.log(err);
            console.log("bong");
            next();
        } else {
            console.log("page found");
        }
    });
});

module.exports = router;