import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model';
import application_config from '../config/app.config';
import {hidePassword} from '../helpers/sanitizer';
import UsersRepository from '../repositories/users.repository';
import {response} from '../helpers/reponse.helper';
import {UN_AUTHORIZED} from '../helpers/status.codes.helper';
import {JWTPayloadModel} from "../models/JWTPayload.model";

const jwtSecret = application_config.jwt_secret;
const _repo = new UsersRepository();

export const authorized = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorization_header = req.headers.authorization as string;
        const token = authorization_header.split(' ')[1];

        const is_valid_jwt = jwt.verify(token, jwtSecret as string);

        if (!is_valid_jwt) {
            return response(UN_AUTHORIZED, res);
        }

        const payload:JWTPayloadModel = jwt.decode(token) as JWTPayloadModel;

        let user_id = payload?.user_id;
        user_id = user_id ? user_id : 0;

        const user: User = await _repo.get(user_id);
        if (!user) {
            return response(UN_AUTHORIZED, res);
        }

        res.locals.user = hidePassword(user);

        next();
    } catch (error) {
        return response(UN_AUTHORIZED, res);
    }
};
