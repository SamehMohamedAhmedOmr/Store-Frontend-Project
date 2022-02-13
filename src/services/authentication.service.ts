import appConf from '../config/app.config'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {hidePassword} from '../helpers/sanitizer'
import {User} from '../models/user.model'
import UsersRepository from "../repositories/users.repository";
import {AuthModel} from "../models/auth.model";

const _repo = new UsersRepository()

export default class AuthenticationService {
    // login request
    static login = async (req: Request): Promise<AuthModel | null> => {
        // get parameters from request body
        const {username, password} = req.body

        // get user by user name
        const user = await _repo.get(username, 'username')

        // 2. verify user exists
        if (!user) {
            return null
        }

        // 3. comapre passwords
        const isMatch = bcrypt.compareSync(
            password + appConf.bcryptPaper,
            user.password as string
        )

        if (!isMatch) {
            return null
        }

        // 4 + 5: generate and send token to user
        return generateAuthObject(user)
    }

    // register user
    static register = async (req: Request) => {
        const user = req.body

        user.password = bcrypt.hashSync(
            user.password + appConf.bcryptPaper,
            appConf.bcryptSalt
        )

        const createdUser = await _repo.create(user)

        return generateAuthObject(createdUser)
    }
}

const generateAuthObject = (user: User): AuthModel => {
    const generatedToken =
        jwt.sign(
            {sub: user.username, name: `${user.first_name} ${user.last_name}`},
            appConf.jwtSecret as string,
            {expiresIn: '30d'}
        )
    return {
        token: generatedToken,
        user: hidePassword(user),
    }
}

// get function

export const authUser = (res: Response) => res.locals.user
