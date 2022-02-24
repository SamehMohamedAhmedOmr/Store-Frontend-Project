import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

import {token} from './helpers/temp_data';

let target_token = '';

beforeAll(async () => {
    target_token = await token();
});

describe('CATEGORIES APISs', () => {

    it('Get all', async () => {
        const response = await request.get('/api/categories');
        expect(response.status).toBe(200);
    });

    it('Get One', async () => {
        const response = await request.get('/api/categories/1');
        expect(response.status).toBe(200);
    });

    it('Create', async () => {
        const response = await request.post('/api/categories')
            .send({
                "name": "CAT 1"
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('update', async () => {
        const response = await request.put('/api/categories/1')
            .send({
                "name": "CAT 1"
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

});
