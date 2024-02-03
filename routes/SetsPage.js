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
    res.write(' <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>');
    res.write('<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">');
    res.write('<style>');
    res.write('body {');
    res.write('color: #FFCB05;')
    res.write('text-shadow: 2px 2px 5px red;')
    res.write(' background-image: url(\'img/landscape.png\');');
    res.write('margin: 0;');
    res.write('padding: 0;');
    res.write('}');
    res.write('header {');
    res.write('     text-shadow: 2px 2px 5px black;')
    res.write('    background-color: #3B4CCA;'); 
    res.write('    padding: 10px 15px;'); 
    res.write('    text-align: center;');
    res.write('    color: white;'); 
    res.write('    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);'); 
    res.write('    font-family: \'Press Start 2P\', cursive;'); 
    res.write('    font-size: 24px;'); 
    res.write('    border-bottom: 3px solid #3B4CCA;'); 
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
    if(set != ' '){
        pokemon.set.where({ q: 'series:' + set + '' }).then(result => {
            res.write('<style>');
            res.write('table { width: 100%; border-collapse: collapse; }');
            res.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #636fcf; border-color: #3B4CCA; border-width: 3px; }');
            res.write('a { color: #FFCB05; }');
            res.write('th { background-color: #636fcf }');
            res.write('img { max-height: 50px; width: auto; }'); 
            res.write('</style>');
            res.write('<table>');
            res.write('<tr><th>Set Logo</th><th>Set Name</th></tr>'); 

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
    }else{
        res.write('<h2> No set found</h2>');
        res.write('</main>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
        
    
    
});
module.exports = router;