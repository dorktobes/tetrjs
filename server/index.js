require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { scores } = require('../db/controllers');

const app = express();

app.use((req, res, next) => {
  console.log(`serving request ${req.method} at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/scores', (req, res) => {
  scores.getN(parseInt(req.query.quantity, 10))
    .then(rows => res.send(rows))
    .catch(err => res.status(500).send(err));
});

app.post('/scores', bodyParser.json(), (req, res) => {
  scores.add(req.body)
    .then(rows => res.status(201).send(rows))
    .catch(err => res.status(500).send(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
