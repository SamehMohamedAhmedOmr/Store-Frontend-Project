import express from 'express';
import {
    createRequest,
    deleteRequest,
} from '../../requests/cart.request';
import {authorized} from "../../middleware/auth.guard";
import CartController from "../../controllers/cart.controller";

const routes = express.Router();
const _controller = CartController;

routes.get('/', authorized, _controller.index);

routes.post('/', authorized, createRequest, _controller.create);

routes.delete('/:id', authorized, deleteRequest, _controller.update);


export default routes;
