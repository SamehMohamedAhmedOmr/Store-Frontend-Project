import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

import {token} from './helpers/temp_data';

let target_token = '';

beforeAll(async () => {
    target_token = await token();
});


describe('ORDER APISs', () => {

    it('Get all', async () => {
        const response = await request.get('/api/orders')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('Create', async () => {
        const response = await request.post('/api/orders')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('get Details', async () => {
        const response = await request.get('/api/orders/1')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

});
