require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const makeCallback = require('./expressCallback');
const { postColour } = require('./controllers');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', express.static(__dirname + '/static'));
// app.use('/api/v1/favorites', require('./routes/v1/favorites'));
// app.use('/api/v1/colour', require('./routes/v1/colour'));

app.post('/api/v1/colour', makeCallback(postColour));
// app.post('/api/v1/favorites', makeCallback(postFavorite));
// app.delete('/api/v1/favorites', makeCallback(deleteFavorite));
// app.get('/api/v1/favorites', makeCallback(getFavorites));

module.exports = server;
