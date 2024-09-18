const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const exercicios = {'Flexão': 0,
                    'Agachamento': 0,
                    'Caminhada': 0,
                    'Água': 0}

app.get('/api/oi', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/exercicios', (req, res) => {
    res.send(exercicios);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
