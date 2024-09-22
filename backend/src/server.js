const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Importar as rotas

const app = express();
app.use(cors());
app.use(express.json()); // Para lidar com JSON

// Usar as rotas
app.use('/api', routes);

// Iniciar o servidor
const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

module.exports = server;
