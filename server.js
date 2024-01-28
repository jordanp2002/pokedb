const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
let SetsPage = require('./routes/SetsPage');

let SearchPage = require('./routes/SearchPage'); 
app.use('/SetsPage', SetsPage);

app.use('/SearchPage', SearchPage);
app.listen(3000, () => console.log('Server running on port 3000'));