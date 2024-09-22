const { createExercises, returnExercises } = require('../services/exerciseService');

const exercises = createExercises();

const getExercises = (req, res) => {
    res.status(200).json(returnExercises());
};

module.exports = {
    getExercises,
};
