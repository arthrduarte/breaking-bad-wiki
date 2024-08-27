var express = require("express");
var router = express.Router();
const data = require('../data/characters.json')

// Get all characters
router.get('/', function (req, res, next) {
    res.json(data);
});

// Get character by index
router.get('/:index/:name', (req, res) => {
    const requestedCharacter = req.params.index
    const response = data[requestedCharacter]

    if (response) {
        res.send(response);
    } else {
        res.status(404).send({ error: "Character not found" });
    }
})

module.exports = router;