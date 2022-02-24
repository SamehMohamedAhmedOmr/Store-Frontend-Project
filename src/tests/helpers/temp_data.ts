import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

const categories_temp = [
    {
        "name": "CATEGORY 1"
    },
    {
        "name": "CATEGORY 2"
    }
];

const products_temp = [
    {
        "name": "Product 1",
        "price": 10,
        "category_id": 1
    },
    {
        "name": "Product 2",
        "price": 10,
        "category_id": 1
    }
];

const token = async () => {
    const response = await request.post('/api/auth/login').send({
        "email": "sameh@gmail.com",
        "password": "123456"
    });
    return response.body.data.token;
}

export {categories_temp, products_temp, token};
