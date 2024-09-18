const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const exercicios = {}

app.get('/api/bemvindo', (req, res) => {
    res.send('Hello, World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

