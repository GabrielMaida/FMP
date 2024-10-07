// Testes de Integração do Server
const request = require('supertest');
const app = require('../../src/server'); // Importa o servidor

describe('Integration Tests', () => {
    it('Deve retornar todos os exercícios', async () => {
        const response = await request(app).get('/api/exercises');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há exercícios
    });

    it('Deve retornar informações do usuário', async () => {
        const response = await request(app).get('/api/user');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
});