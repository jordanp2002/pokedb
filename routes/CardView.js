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
    res.write('<h1>Pokemon TCG</h1>');
    res.write('</header>');
    res.write('<main id="pokemonResults">');
    let id = req.query.id;
    let name = req.query.name;
    pokemon.card.find(id).then(card => {
        res.write('<h2>' + card.name + '</h2>');
        res.write('<img src="' + card.images.large + '" alt="Image of ' + card.name + '">');
        res.write('<p>' + card.text + '</p>');
        res.write('<table>');
        res.write('<tr><th>HP</th><td>' + card.hp + '</td></tr>');
        res.write('<tr><th>Evolves From</th><td>' + (card.evolvesFrom || 'N/A') + '</td></tr>');
        res.write('<tr><th colspan="4">Attacks</th></tr>');
        res.write('<tr><th>Name</th><th>Description</th><th>Damage</th><th>Energy Cost</th></tr>');
    for(let i = 0; i < card.attacks.length; i++) {
        res.write('<tr>');
        res.write('<td>' + card.attacks[i].name + '</td>');
        res.write('<td>' + card.attacks[i].text + '</td>');
        res.write('<td>' + card.attacks[i].damage + '</td>');
        res.write('<td>' + card.attacks[i].convertedEnergyCost + '</td>');
        res.write('</tr>');
        }
        res.write('</table>');
        res.write('</main>');
        res.write('</body>');
        res.write('</html>');
        res.end();
        });
    
    });
module.exports = router;