const userController = require('../../src/controllers/userController');

describe('User Controller', () => {
    it('should return the user details', () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userController.getUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            userId: 1,
            name: 'User 1',
        }));
    });
});
