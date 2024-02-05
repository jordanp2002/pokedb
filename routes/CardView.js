const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    res.write(`<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Pokemon Search</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"> <!-- Pokémon-like font --></link>
                        <style>
                        body {
                            color: #FFCB05;
                            text-shadow: 2px 2px 5px red;
                            background-image: url(\'img/landscape.png\');
                            margin: 0;
                            padding: 0;
                        }
                        header {
                            text-shadow: 2px 2px 5px black;
                            background-color: #3B4CCA; 
                            padding: 20px 15px; 
                            text-align: center;
                            color: white; 
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); 
                            font-family: \'Press Start 2P\', cursive; 
                            font-size: 24px; 
                            border-bottom: 3px solid #3B4CCA; 
                            margin-bottom: 25px;
                        }
                        main {
                            padding: 20px;
                            text-align: center;
                        }
                        img {
                            box-shadow: 8px 8px 5px black;
                            width: 150px;
                            margin: 10px;
                        }
                        </style>
            </head>
                <body>
                     <header>
                        <h1>Pokemon TCG</h1>
                        </header>
            <main id="pokemonResults">`);
    let id = req.query.id;
    let name = req.query.name;
    pokemon.card.find(id).then(card => {
        res.write(`
                    <style>
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; border-color: #3B4CCA; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; border-color: #3B4CCA; border-width: 3px; }
                        th { background-color: #636fcf; border-color: #3B4CCA; border-width: 3px; }
                        tr:nth-child(even) { background-color: #636fcf; }
                        .image-container { text-align: center; margin-bottom: 20px; }
                        img { max-width: 500px; height: auto; }
                    </style>
                    <h1>${card.name} ${card.id}</h1>
                    <div class="image-container">
                        <img src="${card.images.large}" alt="Image of ${card.name}">
                    </div>
                    <p>${card.text}</p>
                    <table>
                        <tr><th>HP</th><td>${card.hp}</td></tr>
                        <tr><th>Evolves From</th><td>${card.evolvesFrom || 'N/A'}</td></tr>
                    </table>
                    <h3>Attacks</h3>
                    <table>
                        <tr><th>Name</th><th>Description</th><th>Damage</th><th>Energy Cost</th></tr>
                `);
        for(let i = 0; i < card.attacks.length; i++) {
            res.write(`<tr>
                            <td>${card.attacks[i].name}</td>
                            <td>${card.attacks[i].text}</td>
                            <td>${card.attacks[i].damage}</td>
                            <td>${card.attacks[i].convertedEnergyCost}</td>
                        </tr>`);
        }
        res.write(`</table>
        <table>
            <h3>Set Information</h3>
                <tr><th>Set</th><th>Rarity</th><th>Number</th></tr>
                    <tr>
                    <td>${card.set.name}</td>
                    <td>${card.rarity}</td>
                    <td>${card.number}</td>
                    </tr>
                </table>
            <table>
            <h3>Prices</h3>
                <tr><th>Avg Sell Price(USD) </th><th>Low Price(USD) </th><th>Trend Price(USD)</th><th>7 Day Average(USD)</th><th>30 Day Average(USD)</th></tr>
                <tr>
                    <td>${(card.cardmarket.prices.averageSellPrice*1.08).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.lowPrice*1.08).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.trendPrice*1.08).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.avg7*1.08).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.avg30*1.08).toFixed(2)}</td>
                </tr>
                <tr><th>Avg Sell Price(CAD) </th><th>Low Price(CAD) </th><th>Trend Price(CAD)</th><th>7 Day Average(CAD)</th><th>30 Day Average(CAD)</th></tr> 
                <tr>
                    <td>${(card.cardmarket.prices.averageSellPrice*1.45).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.lowPrice*1.45).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.trendPrice*1.45).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.avg7*1.45).toFixed(2)}</td>
                    <td>${(card.cardmarket.prices.avg30*1.45).toFixed(2)}</td>
                </tr>  
            </table>
            </main>
            </body>
        </html>`);
        res.end();
        });
    });
module.exports = router;