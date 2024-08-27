var express = require("express");
var router = express.Router();
const data = require('../data/characters.json')

// Get all characters
router.get('/', function (req, res, next) {
    res.json(data);
});

// Get character by name
router.get('/:name', (req, res) => {
    const requestedCharacter = req.params.name
    const response = data.find(character => character.name === requestedCharacter)

    if (response) {
        res.send(response);
    } else {
        res.status(404).send({ error: "Character not found" });
    }
})

module.exports = router;