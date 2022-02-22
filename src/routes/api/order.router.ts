import express from 'express';
import {authorized} from "../../middleware/auth.guard";
import OrdersController from "../../controllers/orders.controller";

const routes = express.Router();
const _controller = OrdersController;

routes.get('/', authorized, _controller.index);

routes.get('/:id', authorized, _controller.orderItems);

routes.post('/', authorized, _controller.create);

export default routes;
