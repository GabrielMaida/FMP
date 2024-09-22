const { createUser, returnUser } = require('../../src/services/userService');

describe('User Service', () => {
    it('should create a user', () => {
        const user = createUser();
        expect(user.name).toBe('User 1');
        expect(user.exercises.length).toBeGreaterThan(0); // Verifica se o usuário tem exercícios
    });

    it('should return user details', () => {
        const user = returnUser();
        expect(user).toHaveProperty('userId', 1);
    });
});
