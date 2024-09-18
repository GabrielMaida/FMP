const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const exercicios = [{
                        'nome':'Flexão',
                        'quantidade':0
                    },
                    {
                        'nome':'Agachamento',
                        'quantidade':0
                    },
                    {
                        'nome':'Caminhada',
                        'quantidade':0
                    },
                    {
                        'nome':'Água',
                        'quantidade':0
                    }]

app.get('/api/exercicios', (req, res) => {
    res.status(200).json(exercicios);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
