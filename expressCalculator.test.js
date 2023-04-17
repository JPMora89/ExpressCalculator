// const { mean, median, mode } = require('./assessment6');
const request = require('supertest');

const app = require('./assessment6');

describe('GET /mean', () => {
  test('returns the correct mean of valid input', () => {
    const response = request(app).get('/mean?nums=1,3,5,7');
    expect(response.status).toBe(200);
})
})