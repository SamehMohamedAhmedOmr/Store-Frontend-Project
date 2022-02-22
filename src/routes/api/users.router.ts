import express from 'express';
import UsersController from '../../controllers/users.controller';
import {
  createRequest,
  UpdateRequest,
} from '../../requests/user.request';
import {admin_guard} from "../../middleware/admin.guard";

const users_route = express.Router();
const _controller = UsersController;

users_route.get('/', admin_guard, _controller.index);

users_route.get('/:id', admin_guard, _controller.get);

users_route.post('/', admin_guard, createRequest, _controller.create);

users_route.put('/:id', admin_guard, UpdateRequest, _controller.update);

export default users_route;
