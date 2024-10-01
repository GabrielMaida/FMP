// Testes dos Controllers
const { exercisesController, userController } = require('../src/controllers');
const { returnExercises, returnUser } = require('../src/services');

jest.mock('../src/services');

describe('Controllers', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('exercisesController should return exercises', () => {
        const mockExercises = [
            { exerciseId: 1, name: 'Push-up', unitXp: 10 },
            { exerciseId: 2, name: 'Squat', unitXp: 10 },
            { exerciseId: 3, name: 'Walking', unitXp: 150 },
            { exerciseId: 4, name: 'Water', unitXp: 300 },
        ];
        returnExercises.mockReturnValue(mockExercises);

        exercisesController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExercises);
    });

    test('userController should return user', () => {
        const mockUser = {
            userId: 1,
            name: 'User 1',
            email: 'user@gmail.com',
            exercises: [
                { exerciseId: 1, name: 'Push-up', unitXp: 10 },
                { exerciseId: 2, name: 'Squat', unitXp: 10 },
                { exerciseId: 3, name: 'Walking', unitXp: 150 },
                { exerciseId: 4, name: 'Water', unitXp: 300 },
            ],
            xpTotal: 0,
            level: 1,
            xpNextLevel: 100,
        };
        returnUser.mockReturnValue(mockUser);

        userController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
});
