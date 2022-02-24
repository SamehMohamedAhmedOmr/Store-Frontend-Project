import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

import {token} from './helpers/temp_data';

let target_token = '';

beforeAll(async () => {
    target_token = await token();
});


describe('USERS APISs', () => {

    it('Get all', async () => {
        const response = await request.get('/api/users')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('Get One', async () => {
        const response = await request.get('/api/users/1')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('Create', async () => {
        const response = await request.post('/api/users')
            .send({
                "first_name" : "SSS",
                "last_name" : "sss",
                "type" : 0,
                "password": "Same._omar_4&"
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(422);
    });

    it('update', async () => {
        const response = await request.put('/api/users/2')
            .send({
                "first_name" : "SSS",
                "last_name" : "sss",
                "type" : 0,
                "password": "Same._omar_4&"
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200
        );
    });

});
