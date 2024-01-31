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
    res.write('    background-color: #e74c3c;'); 
    res.write('    padding: 20px 15px;'); 
    res.write('    text-align: center;');
    res.write('    color: white;'); 
    res.write('    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);'); 
    res.write('    font-family: \'Arial\', sans-serif;'); 
    res.write('    font-size: 24px;'); 
    res.write('    border-bottom: 3px solid #c0392b;'); 
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
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');
    res.write('<header>');
    res.write('<h1>PokeMon Sets</h1>');
    res.write('</header>');
    res.write('<main id="pokemonResults">');
    let set = req.query.set;
    res.write('<h2>' + set + '</h2>');
    pokemon.set.where({ q: 'series:' + set + '' }).then(result => {
        res.write('<style>');
        res.write('table { width: 100%; border-collapse: collapse; }');
        res.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
        res.write('th { background-color: #f2f2f2; }');
        res.write('img { max-height: 50px; width: auto; }'); // Adjust image size as needed
        res.write('</style>');
        res.write('<table>');
        res.write('<tr><th>Set Logo</th><th>Set Name</th></tr>'); // Table headers

        for(let i = 0; i < result.data.length; i++){
            res.write('<tr>');
            res.write('<td><a href="SetView?id=' + result.data[i].id + '&name=' + result.data[i].name + '"><img src="' + result.data[i].images.logo + '" alt="Logo"></a></td>');
            res.write('<td><a href="SetView?id=' + result.data[i].id + '&name=' + result.data[i].name + '">' + result.data[i].name + '</a></td>');
            res.write('</tr>');
        }

        res.write('</table>');
        res.write('</main>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    })
    
        
    
    
});
module.exports = router;