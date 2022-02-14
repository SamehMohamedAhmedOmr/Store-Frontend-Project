import express from 'express';
import {validateLoginRequest, validateRegisterRequest} from '../validators/auth.validators';
import AuthenticationController from '../../../controllers/authentication.controller';

const authentication_route = express.Router();
const _controller = AuthenticationController;

authentication_route.post('/login', validateLoginRequest, _controller.login);

authentication_route.post(
    '/register',
    validateRegisterRequest,
    _controller.register
);

export default authentication_route;
