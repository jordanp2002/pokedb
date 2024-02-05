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
                    <style>
                        body {
                            background-color: #f2f2f2;
                            font-family: 'Arial', sans-serif;
                            margin: 0;
                            padding: 0;
                        }
                        header {
                            background-color: #e74c3c;
                            padding: 20px 15px;
                            text-align: center;
                            color: white;
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                            font-family: 'Arial', sans-serif;
                            font-size: 24px;
                            border-bottom: 3px solid #c0392b;
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
                        <h1>Pokemon TCG</h1>
                    </header>
                    <main id="pokemonResults">
            `);
    let id = req.query.id;
    let name = req.query.name;
    pokemon.set.find(id).then(set => {
        res.write(`
                    <style>
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        tr:nth-child(even){background-color: #f9f9f9;}
                        .image-container { text-align: center; margin-bottom: 20px; }
                        img { max-width: 500px; height: auto; }
                    </style>
                    <img src="${set.images.logo}" alt="Logo of ${set.name}">
                    <table>
                        <tr><th>Property</th><th>Value</th></tr>
                        <tr><td>Name</td><td>${set.name}</td></tr>
                        <tr><td>Release Date</td><td>${set.releaseDate}</td></tr>
                        <tr><td>Total Cards</td><td>${set.total}</td></tr>
                    </table>
                </main>
                </body>
                </html>
                `);
        res.end();
        });
    
    });
module.exports = router;