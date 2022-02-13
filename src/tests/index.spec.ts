import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('suite description', () => {

  it('Test API RESPONSE TO 200', async () => {
    const response = await request.get(
      '/api/images?image=image-4.jpg&width=1000&height=500'
    );
    expect(response.status).toBe(200);
  });
});
