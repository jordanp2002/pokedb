const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    let sort = req.query.sort || 'number';
    let pokemonName = req.query.pokemon;
    let pokemonType = req.query.type;
    res.write('<!DOCTYPE html>');
    res.write('<html lang="en">');
    res.write('<head>');
    res.write('<meta charset="UTF-8">');
    res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    res.write('<title>Pokemon Search</title>');
    res.write(' <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">');
    res.write(' <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>');
    res.write('<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">');
    res.write('<style>');
    res.write('body {');
    res.write('background-color: #f2f2f2;');
    res.write('font-family: \'Arial\', sans-serif;');
    res.write('margin: 0;');
    res.write('padding: 0;');
    res.write('}');
    res.write('header {');
    res.write('    background-color: #007bff;'); 
    res.write('    padding: 10px 15px;'); 
    res.write('    text-align: center;');
    res.write('    color: white;'); 
    res.write('    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);'); 
    res.write('    font-family: \'Arial\', sans-serif;'); 
    res.write('    font-size: 24px;'); 
    res.write('    border-bottom: 3px solid #007bff;'); 
    res.write('    margin-bottom: 25px;');
    res.write('}');
    res.write('main {');
    res.write('padding: 20px;');
    res.write('text-align: center;');
    res.write('}');
    res.write('img {');
    res.write('width: 150px;');
    res.write('margin: 10px;');
    res.write('}');
    res.write('.custom-select {');
    res.write('  font-family: \'Press Start 2P\', cursive;');
    res.write('  background-color: #fff;');
    res.write('  border: 1px solid #000;');
    res.write('  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);');
    res.write('  border-radius: 5px;');
    res.write('  padding: .375rem 1.75rem .375rem .75rem;');
    res.write('  color: #5A5A5A;');
    res.write('}');
    res.write('.btn-primary {');
    res.write('  font-family: \'Press Start 2P\', cursive;');
    res.write('  background-color: #3B4CCA;');
    res.write('  border-color: #2a2a9f;');
    res.write('  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);');
    res.write('  border-radius: 5px;');
    res.write('}');
    res.write('.custom-select:focus, .btn-primary:focus,');
    res.write('.custom-select:hover, .btn-primary:hover {');
    res.write('  border-color: #ffcb05;');
    res.write('  outline: none;');
    res.write('}');
    res.write('option:disabled, option:checked {');
    res.write('  background-color: #E0E0E0;');
    res.write('}');
    res.write('.custom-select{');
    res.write('  width: 50%;'); // Adjust width as needed
    res.write('  margin: 0 auto;'); // Center the element
    res.write('}');
    res.write('.btn-primary{');
    res.write('  width: 50%;'); // Adjust width as needed
    res.write('  margin: 0 auto;'); // Center the element
    res.write('}');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');
    res.write('<header>');
    res.write('<h1>Pokemon Search</h1>');
    res.write('</header>');
    res.write('<main id="pokemonResults">');
    res.write('<form action="SearchPage" method="get">');
    res.write('<select name="sort" id="sort" class="custom-select">');
    res.write('<option value="rarity"' + (sort === 'rarity' ? ' selected' : '') + '>Rarity Ascending</option>');
    res.write('<option value="-rarity"' + (sort === '-rarity' ? ' selected' : '') + '>Rarity Descending</option>');
    res.write('<option value="set.releaseDate"' + (sort === 'set.releaseDate' ? ' selected' : '') + '>Release Date Ascending</option>');
    res.write('<option value="-set.releaseDate"' + (sort === '-set.releaseDate' ? ' selected' : '') + '>Release Date Descending</option>');
    res.write('</select>');
    res.write('<button type="submit" class="btn btn-primary">Sort</button>');
    res.write('<input type="hidden" name="pokemon" value="' + pokemonName + '">');
    res.write('<input type="hidden" name="type" value="' + pokemonType + '">');
    res.write('</form>');

    if(pokemonName != undefined && pokemonType == "None"){
        pokemon.card.where({ q: 'name:' + pokemonName + '*', orderBy: sort }).then(result => {
            for (let i = 0; i < result.data.length; i++) {
                res.write('<a href="CardView?id=' + result.data[i].id + '&name=' + result.data[i].name + '"><img src="' + result.data[i].images.small + '"></a>');
            }
            if (result.data.length == 0) {
                res.write('<h2>No Pokemon found</h2>');
            }
            res.write('</main>');
            res.write('</body>');
            res.write('</html>');
            res.end();
      }); }else if(pokemonName == '' && pokemonType != "None"){
            pokemon.card.where({ q: 'types:' + pokemonType, orderBy: sort }).then(result => {
                for (let i = 0; i < result.data.length; i++) {
                    res.write('<a href="CardView?id=' + result.data[i].id + '&name=' + result.data[i].name + '"><img src="' + result.data[i].images.small + '"></a>');
                }
                if (result.data.length == 0) {
                    res.write('<h2>No Pokemon found</h2>');
                }
                res.write('</main>');
                res.write('</body>');
                res.write('</html>');
                res.end();
        }); }else if(pokemonName != '' && pokemonType != "None"){
            pokemon.card.where({ q: 'name:' + pokemonName + ' types:' + pokemonType, orderBy: sort }).then(result => {
                for (let i = 0; i < result.data.length; i++) {
                    res.write('<a href="CardView?id=' + result.data[i].id + '&name=' + result.data[i].name + '"><img src="' + result.data[i].images.small + '"></a>');
                }
                if (result.data.length == 0) {
                    res.write('<h2>No Pokemon found</h2>');
                }
                res.write('</main>');
                res.write('</body>');
                res.write('</html>');
                res.end();
        }); }
});
module.exports = router;