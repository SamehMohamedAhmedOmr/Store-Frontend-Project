import supertest from 'supertest';
import app from '../server';
const request = supertest(app);

import {token} from './helpers/temp_data';

let target_token = '';

beforeAll(async () => {
    target_token = await token();
});

describe('PRODUCTS APISs', () => {

    it('Get all', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    });

    it('Get One', async () => {
        const response = await request.get('/api/products/1');
        expect(response.status).toBe(200);
    });

    it('Create', async () => {
        const response = await request.post('/api/products')
            .send({
                "name": "Product 15",
                "price" : 10,
                "category_id" : 1
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('update', async () => {
        const response = await request.put('/api/products/1')
            .send({
                "name": "Product 15",
                "price" : 10,
                "category_id" : 1
            })
            .set('Authorization', 'Bearer ' + target_token);
        expect(response.status).toBe(200);
    });

    it('Get Top 5 Product Most viewed', async () => {
        const response = await request.get('/api/products-most-viewed');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeLessThan(6);
    });

});
