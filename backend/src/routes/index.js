const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');
const userController = require('../controllers/userController');

// Definindo as rotas
router.get('/exercises', exercisesController.getExercises);
router.get('/user', userController.getUser);

module.exports = router;
