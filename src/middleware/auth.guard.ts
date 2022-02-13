import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model'
import appConf from '../config/app.config'
import {hidePassword} from '../helpers/sanitizer'
import UsersRepository from "../repositories/users.repository";
import {response} from '../helpers/reponse.helper'
import {UN_AUTHORIZED} from '../helpers/status.codes.helper'

const jwtSecret = appConf.jwtSecret
const _repo = new UsersRepository()

export const authorized = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authorization_header = req.headers.authorization as string
        const token = authorization_header.split(' ')[1] // [0: 'Bearer', 1:'<token>']

        // Check if token is valid
        const is_valid_jwt = jwt.verify(token, jwtSecret as string)

        if (!is_valid_jwt) {
            throw new Error()
        }

        // Decode token
        const payload = jwt.decode(token)

        // Check if user exists
        const user: User = await _repo.get(payload?.sub as string)
        if (!user) throw new Error()

        res.locals.user = hidePassword(user)

        // Continue to request
        next()
    } catch (error) {
        return response(UN_AUTHORIZED, res)
    }
}
