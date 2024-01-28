const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    let pokemonName = req.query.pokemon;
    pokemon.card.where({ q: 'name:' + pokemonName}).then(result => {
        res.send(result.data[0].small);
    })
});
module.exports = router;