const supertest = require('supertest');
// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, expect, it } = require('@jest/globals');
const app = require('./app');

const request = supertest(app);

describe('Эндпоинты откликаются на запросы', () => {
  it('Возвращает данные и 201-й ответ по запросу к "/signup"', async () => {
    const response = await request.post('/signup');
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch('application/json');
    expect(response.body).toHaveProperty(['email', 'name', 'about', 'avatar']);
  });
});
