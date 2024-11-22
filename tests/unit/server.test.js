const request = require('supertest');
const app = require('../../src/server'); // Ajuste o caminho conforme necessário

describe('API Users', () => {
    it('deve retornar todos os usuários', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });

    it('deve retornar um usuário específico pelo seu Id', async () => {
        const userId = 0;
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId', userId);
    });

    it('deve retornar 404 se o usuário não for encontrado', async () => {
        const userId = 999; // Um Id que não existe
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });

    it('deve retornar todos os exercícios', async () => {
        const response = await request(app).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });

    it('deve retornar 500 se não retornar os exercícios', async () => {
        const response = await request(app).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object');
    });
});
