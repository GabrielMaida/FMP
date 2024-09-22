const exercisesController = require('../../src/controllers/exercisesController');

describe('Exercises Controller', () => {
    it('should return all exercises', () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        exercisesController.getExercises(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array)); // Verifica se é um array
    });
});
