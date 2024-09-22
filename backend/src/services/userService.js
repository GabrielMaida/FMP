const { createExercises } = require('./exerciseService');

function createUser() {
    return {
        userId: 1,
        name: 'User 1',
        email: 'user@gmail.com',
        password: '123456',
        exercises: createExercises(),
        xpTotal: 0,
        level: 1,
        xpNextLevel: 100,
    };
}

function returnUser() {
    return createUser();
}

module.exports = {
    createUser,
    returnUser,
};
