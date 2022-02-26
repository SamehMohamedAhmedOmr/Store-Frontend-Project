import ProductsRepository from "../repositories/products.repository";
import CategoriesRepository from "../repositories/categories.repository";

import {DbSeed} from '../seeders/database.seeder';

import {
    categories_temp,
    products_temp,
    users_temp
} from './helpers/temp_data';
import UsersRepository from "../repositories/users.repository";

const categoriesRepository = new CategoriesRepository();
const productsRepository = new ProductsRepository();
const usersRepository = new UsersRepository();


beforeAll(async () => {

    for (const value of users_temp) {
        await usersRepository.create(value);
    }

    for (const value of categories_temp) {
        await categoriesRepository.create(value);
    }

    for (const value of products_temp) {
        await productsRepository.create(value);
    }

});

