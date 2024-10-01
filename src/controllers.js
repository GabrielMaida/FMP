const {returnExercises, returnUser } = require('./services');

const exercisesController = (req, res) => {
    res.status(200).json(returnExercises());
};

const userController = (req, res) => {
    res.status(200).json(returnUser());
};

module.exports = {
    exercisesController,
    userController
};
