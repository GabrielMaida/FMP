function returnExercises() {
    const exercises = [
        { exerciseId: 1, name: 'Push-up', unitXp: 10 },
        { exerciseId: 2, name: 'Squat', unitXp: 10 },
        { exerciseId: 3, name: 'Walking', unitXp: 150 }, // 1km
        { exerciseId: 4, name: 'Water', unitXp: 300 },   // 1L
    ]
    return exercises;
}

function returnUser() {
    const user = {
        userId: 1,
        name: 'User 1',
        email: 'user@gmail.com',
        password: '123456',
        exercises: returnExercises(),
        xpTotal: 0,
        level: 1,
        xpNextLevel: 100,
    };
    return user;
}

module.exports = {
    returnExercises,
    returnUser,
};
