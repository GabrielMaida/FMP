const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const exercicios = [{
        'idExercicio':1,
        'nome':'Flexão',
        'xpUnitario':10
    },
    {
        'idExercicio':2,
        'nome':'Agachamento',
        'xpUnitario':10
    },
    {
        'idExercicio':3,
        'nome':'Caminhada',
        'xpUnitario':150 //1km
    },
    {
        'idExercicio':4,
        'nome':'Água',
        'xpUnitario':300 //1L
    }]

const usuario = {
                idUsuario:1,
                nome:'Usuário',
                email:'usuario@gmail.com',
                senha:'123456',
                exercicios:exercicios,
                xpTotal:0,
                nivel:1,
                xpProximoNivel:100,
                ultimaAtualizacao:new Date()
            }

app.get('/api/exercicios', (req, res) => {
    res.status(200).json(usuario);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


/*
releases
estrutura de pastas

*/