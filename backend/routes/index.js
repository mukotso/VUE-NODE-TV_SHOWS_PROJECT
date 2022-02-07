const express = require('express')
const app = express();
const auth = require('./auth')
const actors = require('./actors')
const episodes = require('./episodes')
const genres = require('./genres')
const movies = require('./movies')
const subscriptions = require('./subscriptions')
const users = require('./users')
const notifications = require('./notifications')
const favourites = require('./favourites')
const comments = require('./comments')
const ratings = require('./ratings')

app.use('/auth', auth);
app.use('/actors', actors);
app.use('/episodes', episodes);
app.use('/genres', genres);
app.use('/movies', movies);
app.use('/subscriptions', subscriptions);
app.use('/users', users);
app.use('/notifications', notifications);
app.use('/favourites', favourites);
app.use('/comments', comments);
app.use('/ratings', ratings);

module.exports = app;