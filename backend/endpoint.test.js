const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

// describe('Эндпоинты откликаются на запросы', () => {
//   it('Возвращает данные и 200-й ответ по запросу к "/"', () => request.get('/').then((response) => {
//     expect(response.status).toBe(200);
//     // expect(response.text).toBe('Hello World!');
//   }));
// });
