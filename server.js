const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
app.use(express.static("./public"));
let SetsPage = require('./routes/SetsPage');
let CardView = require('./routes/CardView');
let SetView = require('./routes/SetView');
let GamePage = require('./routes/GamePage');

let SearchPage = require('./routes/SearchPage'); 
app.use('/SetsPage', SetsPage);
app.use('/CardView', CardView);
app.use('/SetView', SetView);
app.use('/GamePage', GamePage);

app.use('/SearchPage', SearchPage);
app.listen(3000, () => console.log('Server running on port 3000'));