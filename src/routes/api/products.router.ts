import express from 'express';
import {
  createRequest,
  updateRequest,
  filterRequest,
} from '../../requests/products.request';
import { admin_guard } from '../../middleware/admin.guard';
import ProductsController from '../../controllers/products.controller';

const routes = express.Router();
const _controller = ProductsController;

routes.get('/', filterRequest, _controller.index);

routes.get('/:id', _controller.get);

routes.post('/', admin_guard, createRequest, _controller.create);

routes.put('/:id', admin_guard, updateRequest, _controller.update);

export default routes;
