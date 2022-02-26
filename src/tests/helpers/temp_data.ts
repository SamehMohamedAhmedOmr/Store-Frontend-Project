import supertest from 'supertest';
import app from '../../server';
import {User} from "../../models/user.model";
import bcrypt from "bcrypt";
import application_config from "../../config/app.config";

const request = supertest(app);

const plain_password = '123456';
const email = 'sameh@gmail.com';

const password = bcrypt.hashSync(
    plain_password + application_config.bcrypt_paper,
    application_config.bcrypt_salt
);

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

const users_temp: User[] = [
    {
        first_name: 'Sameh',
        last_name: 'Omar',
        email: email,
        password: password,
        type: 0,
    },
];

const token = async () => {
    const response = await request.post('/api/auth/login').send({
        "email": "sameh@gmail.com",
        "password": "123456"
    });
    return response.body.data.token;
}

export {categories_temp, products_temp, users_temp, token};
