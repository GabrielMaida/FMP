const request = require('supertest');
const app = require('../../src/server');

describe('API integrantes', () => {
    test('GET /integrantes deve retornar os integrantes do grupo', async () => {
        const response = await request(app).get('/integrantes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('integrantes');
        expect(response.body.integrantes.length).toBe(4);
    });

    /*it('deve retornar todos os usuários', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });

    it('deve retornar um usuário específico pelo seu Id', async () => {
        const userId = 0;
        // await User.create({ userId, name: 'Test User', email: 'test@example.com', tel: '123456789', exercises: [], xpTotal: 0, level: 1 });
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId', userId);
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
        const userId = 999; // Um Id que não existe
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });*/

    /*it('deve retornar todos os exercícios', async () => {
        const response = await request(app).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });*/
    
    /*it('deve retornar 500 se não retornar os exercícios', async () => {
        const response = await request(app).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });*/
});
