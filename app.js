require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const scoresRouter = require('./routes/scores');
const gamesRouter = require('./routes/games');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/scores', scoresRouter);
app.use('/games', gamesRouter);

module.exports = app;