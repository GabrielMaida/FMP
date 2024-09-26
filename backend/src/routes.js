const express = require('express');
const router = express.Router();
const {exercisesController, userController} = require('./controllers');

// Definindo as rotas
router.get('/exercises', exercisesController);
router.get('/user', userController);

module.exports = router;
