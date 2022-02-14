import express, { Request, Response } from 'express';
import UsersController from '../../../controllers/users.controller';
import { authorized } from '../../../middleware/auth.guard';
import {
  createUserRequest,
  UpdateUserRequest,
} from '../../../requests/user.request';

const users_route = express.Router();
const _controller = UsersController;

users_route.get('/', _controller.index);

users_route.get('/:id', _controller.get);

users_route.post('/', authorized, createUserRequest, _controller.create);

users_route.put('/', authorized, UpdateUserRequest, _controller.update);

export default users_route;
