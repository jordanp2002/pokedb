const express = require('express');
const router = express.Router();
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '${process.env.API_KEY}'});

router.get('/', function(req, res,next) {
    let sort = req.query.sort || 'number';
    let pokemonName = req.query.pokemon;
    let pokemonType = req.query.type;
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
                        background-image: url('img/landscape.png');
                        font-family: 'Press Start 2P', cursive;
                        margin: 0;
                        padding: 0;
                        color: #FFCB05;
                        text-shadow: 2px 2px 5px red;
                    }
                    header {
                        text-shadow: 2px 2px 5px black;
                        background-color: #3B4CCA;
                        padding: 10px 15px;
                        text-align: center;
                        color: white;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
                        box-shadow: 8px 8px 5px black;
                    }
                    .custom-select, .btn-primary {
                        font-family: 'Press Start 2P', cursive;
                        background-color: #fff;
                        border: 1px solid #000;
                        box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
                        border-radius: 5px;
                        padding: .375rem 1.75rem .375rem .75rem;
                        color: #5A5A5A;
                        width: 50%; 
                        margin: 0 auto; 
                    }
                    .btn-primary {
                        background-color: #3B4CCA;
                        border-color: #2a2a9f;
                    }
                    .custom-select:focus, .btn-primary:focus, .custom-select:hover, .btn-primary:hover {
                        border-color: #ffcb05;
                        outline: none;
                    }
                    option:disabled, option:checked {
                        background-color: #E0E0E0;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Pokemon Search</h1>
                </header>
                <main id="pokemonResults">
                    <form action="SearchPage" method="get">
                        <select name="sort" id="sort" class="custom-select">
                            <option value="rarity"${sort === 'rarity' ? ' selected' : ''}>Rarity Ascending</option>
                            <option value="-rarity"${sort === '-rarity' ? ' selected' : ''}>Rarity Descending</option>
                            <option value="set.releaseDate"${sort === 'set.releaseDate' ? ' selected' : ''}>Release Date Oldest</option>
                            <option value="-set.releaseDate"${sort === '-set.releaseDate' ? ' selected' : ''}>Release Date Newest</option>
                        </select>
                        <button type="submit" class="btn btn-primary">Sort</button>
                        <input type="hidden" name="pokemon" value="${pokemonName}">
                        <input type="hidden" name="type" value="${pokemonType}">
                    </form>
            `);
    if (pokemonName && pokemonType === "None") {
        query = `name:${pokemonName}*`;
    } else if (pokemonName === '' && pokemonType !== "None") {
        query = `types:${pokemonType}`;
    } else if (pokemonName && pokemonType !== "None") {
        query = `name:${pokemonName} types:${pokemonType}`;
    }

    if(query){
        try{
            pokemon.card.where({ q: query, orderBy: sort, pageSize: 250}).then(result => {
                for (let i = 0; i < result.data.length; i++) {
                    res.write(`<a href="CardView?id=${result.data[i].id}&name=${result.data[i].name}"><img src="${result.data[i].images.small}"></a>`);
                }
                if (result.data.length == 0) {
                    res.write('<h2>No Pokemon found</h2>');
                }
                res.write('</main>');
                res.write('</body>');
                res.write('</html>');
                res.end();
            });
        }
        catch(err){
            console.log(err);
        }
    }
});
module.exports = router;