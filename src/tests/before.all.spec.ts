

import ProductsRepository from "../repositories/products.repository";
import CategoriesRepository from "../repositories/categories.repository";

import {
    categories_temp,
    products_temp
} from './helpers/temp_data';


const categoriesRepository = new CategoriesRepository();
const productsRepository = new ProductsRepository();



beforeAll(async () => {
    for (const value of categories_temp) {
        await categoriesRepository.create(value);
    }

    for (const value of products_temp) {
        await productsRepository.create(value);
    }

});

