const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Pokemon Search</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
                    <style>
                        body {
                            color: #FFCB05;
                            text-shadow: 2px 2px 5px red;
                            background-image: url('img/landscape.png');
                            margin: 0;
                            padding: 0;
                        }
                        header {
                            text-shadow: 2px 2px 5px black;
                            background-color: #3B4CCA;
                            padding: 10px 15px;
                            text-align: center;
                            color: white;
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                            font-family: 'Press Start 2P', cursive;
                            font-size: 24px;
                            border-bottom: 3px solid #3B4CCA;
                            margin-bottom: 25px;
                        }
                        main {
                            padding: 20px;
                            text-align: center;
                        }
                        img {
                            width: 150px;
                            margin: 10px;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h1>PokeMon Sets</h1>
                    </header>
                    <main id="pokemonResults">
            `);
    let set = req.query.set;
    res.write('<h2>' + set + '</h2>');
    if(set != ' '){
        pokemon.set.where({ q: 'series:' + set + '' }).then(result => {
            res.write(`<style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #636fcf; border-color: #3B4CCA; border-width: 3px; }
                        a { color: #FFCB05; }
                        th { background-color: #636fcf }
                        img { max-height: 50px; width: auto; } 
                    </style>
                    <table>
                        <tr><th>Set Logo</th><th>Set Name</th></tr> `);
            for(let i = 0; i < result.data.length; i++){
                res.write(`<tr>
                            <td><a href="SetView?id=${result.data[i].id}&name=${result.data[i].name}"><img src="${result.data[i].images.logo}" alt="Logo"></a></td>
                            <td><a href="SetView?id=${result.data[i].id}&name=${result.data[i].name}">${result.data[i].name}</a></td>
                        </tr>`);
            }

            res.write(`</table>
                        </main>
                        </body>
                        </html>`);
            res.end();
        })
    }else{
        res.write(`<h2> No set found</h2>
                    </main>
                    </body>
                    </html>`);
        res.end();
    }
});
module.exports = router;