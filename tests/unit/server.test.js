const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/server');

let mongoServer;
const PORT = process.env.MONGODB_URI;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('API Users', () => {
    it('deve retornar todos os usuários', async () => {
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
