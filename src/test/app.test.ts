import request from 'supertest';
import app from '../app';

describe('API Tests', () => {
  it('test app', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Aphiwat leelasawatsuk' });
  });

  it('should fetch users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(typeof response.body === 'object').toBeTruthy();
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
