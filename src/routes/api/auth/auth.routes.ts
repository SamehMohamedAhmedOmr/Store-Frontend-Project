import express from 'express';
import {
  loginRequest,
  registerRequest,
} from '../../../requests/authentication.request';
import AuthenticationController from '../../../controllers/authentication.controller';

const authentication_route = express.Router();
const _controller = AuthenticationController;

authentication_route.post('/login', loginRequest, _controller.login);

authentication_route.post('/register', registerRequest, _controller.register);

export default authentication_route;
