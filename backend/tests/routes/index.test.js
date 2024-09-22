/*const request = require('supertest');
const server = require('../../src/server'); // Importando o servidor

describe('API Routes', () => {
    afterAll(() => {
        server.close(); // Fecha o servidor após os testes
    });

    it('should return exercises', async () => {
        const response = await request(server).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return user details', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId', 1);
    });
});*/
