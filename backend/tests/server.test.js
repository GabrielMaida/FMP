// Testes do Servidor
const request = require('supertest');
const server = require('../src/server');

afterAll(() => {
  server.close();
});

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(server).get('/api/exercises');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { exerciseId: 1, name: 'Push-up', unitXp: 10 },
      { exerciseId: 2, name: 'Squat', unitXp: 10 },
      { exerciseId: 3, name: 'Walking', unitXp: 150 },
      { exerciseId: 4, name: 'Water', unitXp: 300 },
    ]);
  });
});
