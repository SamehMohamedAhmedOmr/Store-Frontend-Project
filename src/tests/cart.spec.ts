import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

import {token} from './helpers/temp_data';

let target_token = '';

beforeAll(async () => {
    target_token = await token();
});


describe('CART APISs', () => {

    it('Get all', async () => {
        const response = await request.get('/api/cart')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('Create', async () => {
        const response = await request.post('/api/cart')
            .send({
                "quantity": 15,
                "product_id": 1
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);

        const response2 = await request.post('/api/cart')
            .send({
                "quantity": 15,
                "product_id": 2
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response2.status).toBe(200);
    });

    it('delete', async () => {
        const response = await request.delete('/api/cart/1')
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

});
