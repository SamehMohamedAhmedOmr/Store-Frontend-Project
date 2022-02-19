import express, { Request, Response } from 'express';
import UsersController from '../../controllers/users.controller';
import {
  createUserRequest,
  UpdateUserRequest,
} from '../../requests/user.request';
import {admin_guard} from "../../middleware/admin.guard";

const users_route = express.Router();
const _controller = UsersController;

users_route.get('/', _controller.index);

users_route.get('/:id', _controller.get);

users_route.post('/', admin_guard, createUserRequest, _controller.create);

users_route.put('/', admin_guard, UpdateUserRequest, _controller.update);

export default users_route;
