const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/*',(req, res, next) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => res.send(JSON.stringify(json)));

})

module.exports = router;