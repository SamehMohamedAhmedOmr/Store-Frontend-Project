import express from 'express'
import {
    validateLoginRequest,
    validateRegisterRequest,
} from '../validators/auth.validators'
import AuthenticationController from "../../../controllers/authentication.controller";

const authentication_route = express.Router()
const _controller = AuthenticationController

/**
 * * login request
 * @method POST
 * @dataType body json
 * @param username: string
 * @param password: string
 * @returns AuthObject
 * @throws {Error} 401: Unauthorized
 * @throws {Error} 422: UnprocessableEntity
 */
authentication_route.post(
    '/login', // * path
    validateLoginRequest, // ! validation
    _controller.login // ? controller
)

/**
 * * register request
 * @method POST
 * @param user: User
 * @returns User
 * @throws {Error} 422: Unprocessable entity
 */
authentication_route.post(
    '/register', // * path
    validateRegisterRequest, // ! validation
    _controller.register // ? controller
)

export default authentication_route
