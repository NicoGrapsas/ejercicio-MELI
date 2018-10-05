const PORT = 8080;

var express = require('express');
var cors = require('cors');
var app = express();
var MELI = require('./services/meli/api');

app.use(cors());

app.get('/', function(req, res){
    res.send('Mercadolibre!');
});

app.get('/api/items(/:id)?', function(req, res) {
    if (req.query.q) { MELI.search(req.query.q).then(json => res.send(json)); }
    if (req.params.id) { MELI.item(req.params.id, req.query.withCategories).then(json => res.send(json)) }
});

app.listen(PORT, function() {
    console.log(`APP LISTENING ON ${PORT}`);
});