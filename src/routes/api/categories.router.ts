import express from 'express';
import {
    createRequest,
    updateRequest,
} from '../../requests/categories.request';
import CategoriesController from "../../controllers/categories.controller";
import {admin_guard} from "../../middleware/admin.guard";

const routes = express.Router();
const _controller = CategoriesController;

routes.get('/', _controller.index);

routes.get('/:id', _controller.get);

routes.post('/', admin_guard, createRequest, _controller.create);

routes.put('/:id', admin_guard, updateRequest, _controller.update);

export default routes;
