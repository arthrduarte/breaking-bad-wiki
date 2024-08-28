var express = require("express");
var router = express.Router();
const data = require('../data/characters.json')

// Get all characters
router.get('/', function (req, res, next) {
    res.send(data);
});

// Get character by index
router.get('/:series/:name', (req, res) => {
    const response = data.find(character => character.series === req.params.series && character.name === req.params.name)

    if (response) {
        res.send(response);
    } else {
        res.status(404).send({ error: "Character not found" });
    }
})

// Get character by series
router.get('/:series', (req, res) => {
    const requestedSeriesCharacters = req.params.series;

    if (requestedSeriesCharacters === "all") {
        res.send(data)
    } else if (requestedSeriesCharacters === "Breaking Bad" || requestedSeriesCharacters === "Better Call Saul") {
        const response = data.filter(character => character.series === requestedSeriesCharacters)
        res.send(response);
    } else {
        res.status(404).send({ error: "Show not found" });
    }
})

module.exports = router;