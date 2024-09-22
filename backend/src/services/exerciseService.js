function createExercises() {
    return [
        { exerciseId: 1, name: 'Push-up', unitXp: 10 },
        { exerciseId: 2, name: 'Squat', unitXp: 10 },
        { exerciseId: 3, name: 'Walking', unitXp: 150 }, // 1km
        { exerciseId: 4, name: 'Water', unitXp: 300 },   // 1L
    ];
}

function returnExercises() {
    return createExercises();
}

module.exports = {
    createExercises,
    returnExercises,
};
