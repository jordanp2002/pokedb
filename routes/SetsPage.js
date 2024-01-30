const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    res.write('<!DOCTYPE html>');
    res.write('<html lang="en">');
    res.write('<head>');
    res.write('<meta charset="UTF-8">');
    res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    res.write('<title>Pokemon Search</title>');
    res.write('<style>');
    res.write('body {');
    res.write('background-color: #f2f2f2;');
    res.write('font-family: \'Arial\', sans-serif;');
    res.write('margin: 0;');
    res.write('padding: 0;');
    res.write('}');
    res.write('header {');
    res.write('background-color: #e74c3c;');
    res.write('padding: 15px;');
    res.write('text-align: center;');
    res.write('}');
    res.write('main {');
    res.write('padding: 20px;');
    res.write('text-align: center;');
    res.write('}');
    res.write('img {');
    res.write('width: 150px;');
    res.write('margin: 10px;');
    res.write('}');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');
    res.write('<header>');
    res.write('<h1>PokeMon Sets</h1>');
    res.write('</header>');
    res.write('<main id="pokemonResults">');
    pokemon.set.where({ q: 'series: Sword & Shield' }).then(result => {
         for (let i = 0; i < result.data.length; i++) {
            res.write ('<img src="' + result.data[i].images.small+ '">');
         }
        res.write('</main>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    });
    
});
module.exports = router;