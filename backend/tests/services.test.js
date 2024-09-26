const {returnExercises, returnUser} = require('../src/services');

describe('Exercises Services', () => {
    it('should return exercises', () => {
        const exercises = returnExercises();
        expect(exercises).toStrictEqual([
            { exerciseId: 1, name: 'Push-up', unitXp: 10 },
            { exerciseId: 2, name: 'Squat', unitXp: 10 },
            { exerciseId: 3, name: 'Walking', unitXp: 150 },
            { exerciseId: 4, name: 'Water', unitXp: 300 },
        ]);
    }); 
});

describe('User Services', () => {
    it('should return user', () => {
        const user = returnUser();
        expect(user).toHaveProperty('userId');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('exercises');
        expect(user.exercises.length).toBe(4);
        expect(user).toHaveProperty('xpTotal');
        expect(user).toHaveProperty('level');
        expect(user).toHaveProperty('xpNextLevel');
    });   
});
