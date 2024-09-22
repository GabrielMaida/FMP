const { createExercises, returnExercises } = require('../../src/services/exerciseService');

describe('Exercise Service', () => {
    it('should create exercises', () => {
        const exercises = createExercises();
        expect(exercises.length).toBe(4); // Verifica se foram criados 4 exercícios
    });

    it('should return exercises', () => {
        const exercises = returnExercises();
        expect(exercises).toEqual(expect.any(Array)); // Verifica se é um array
    });
});
