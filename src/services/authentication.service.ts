import application_config from '../config/app.config';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {hidePassword} from '../helpers/sanitizer';
import {User} from '../models/user.model';
import UsersRepository from '../repositories/users.repository';
import {AuthModel} from '../models/auth.model';
import {JWTPayloadModel} from "../models/JWTPayload.model";

const _repo = new UsersRepository();

export default class AuthenticationService {
    static login = async (req: Request): Promise<AuthModel | null> => {
        const {username, password} = req.body;

        const user = await _repo.get(username, 'username');

        if (!user) {
            return null;
        }

        const is_match = bcrypt.compareSync(
            password + application_config.bcrypt_paper,
            user.password as string
        );

        if (!is_match) {
            return null;
        }

        return generateAuthObject(user);
    };

    static register = async (req: Request) => {
        const user = req.body;

        user.password = bcrypt.hashSync(
            user.password + application_config.bcrypt_paper,
            application_config.bcrypt_salt
        );

        const createdUser = await _repo.create(user);

        return generateAuthObject(createdUser);
    };
}

const generateAuthObject = (user: User): AuthModel => {
    const payload: JWTPayloadModel = {
        user_id: user.id,
        name: `${user.first_name} ${user.last_name}`
    }
    const generatedToken = jwt.sign(
        payload,
        application_config.jwt_secret as string,
        {expiresIn: '30d'}
    );

    return {
        token: generatedToken,
        user: hidePassword(user),
    };
};

export const authUser = (res: Response) => res.locals.user;
