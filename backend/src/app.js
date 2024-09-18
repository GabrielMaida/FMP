const express = require('express');
const app = express();

const exercicios = {}

app.get('/api/bemvindo', (req, res) => {
    res.send('Hello, World!');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

