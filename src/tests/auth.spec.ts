import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('AUTH APISs', () => {

    it('LOGIN', async () => {
        const response = await request.post('/api/auth/login').send({
            "email" : "sameh@gmail.com",
            "password" : "123456"
        });
        expect(response.status).toBe(200);
    });


    it('REGISTER', async () => {
        const response = await request.post('/api/auth/register').send({
            "first_name": "SAM",
            "last_name": "OMAR",
            "password": "Same._omar_4&"
        });
        expect(response.status).toBe(422);
    });

});



