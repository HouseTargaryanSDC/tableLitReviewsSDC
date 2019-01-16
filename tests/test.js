const request = require('supertest');
const app = require('../server/app.js');

describe('/GET /api/reviews', () => {
  test('Should respond with an array', () => (
    request(app).get('/api/reviews/all/1')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([expect.anything()]));
      })
      .catch((err) => {
        console.log('error in jest -->', err);
      })
  ));
});

describe('GET /api/reviews/summary', () => {
  test('Should respond with an object with review summary properties', () => (
    request(app).get('/api/reviews/summary/1')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
          avg_ambience: expect.any(Number),
          avg_food: expect.any(Number),
          avg_overall: expect.any(Number),
          avg_service: expect.any(Number),
          loved_for_1: expect.any(String),
          loved_for_2: expect.any(String),
          noise_level: expect.any(String),
          pct_recommend: expect.any(Number),
          restaurant_id: expect.any(Number),
          review_filter_1: expect.any(String),
          review_filter_2: expect.any(String),
          review_filter_3: expect.any(String),
          review_filter_4: expect.any(String),
          review_filter_5: expect.any(String),
          total_reviews: expect.any(Number),
        }));
      })
      .catch((err) => {
        console.log('error in jest -->', err);
      })
  ));
});
