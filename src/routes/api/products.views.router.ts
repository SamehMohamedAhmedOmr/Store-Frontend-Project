import express from 'express';
import ProductsController from '../../controllers/products.controller';

const routes = express.Router();
const _controller = ProductsController;

routes.get('/', _controller.mostViewed);

export default routes;
