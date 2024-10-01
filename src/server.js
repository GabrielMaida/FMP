const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
const routes = require('./routes');

const app = express();
// app.use(cors());
app.use(express.json()); // Para lidar com JSON
const PORT = 4000;

// Usar as rotas
app.use('/api', routes);

// Iniciar o servidor
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
