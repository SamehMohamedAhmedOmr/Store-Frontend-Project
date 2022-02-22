import {Request, Response} from 'express';
import UsersRepository from '../repositories/users.repository';
import {User} from '../models/user.model';
import {hidePassword} from "../helpers/sanitizer";
import bcrypt from "bcrypt";
import application_config from "../config/app.config";

const _repo = new UsersRepository();

export default class UsersService {
    static index = async (): Promise<User[]> => {
        let target_users: User[] = []

        await _repo.index().then(users => {
            users.forEach(user => {
                target_users.push(hidePassword(user));
            })
        });

        return target_users;
    };

    static get = async (req: Request): Promise<User | null> => {
        const {id} = req.params;
        let model = await _repo.get(parseInt(id));
        model = hidePassword(model);
        if (!model) {
            return null;
        }
        return model;
    };

    static create = async (req: Request, res: Response): Promise<User | null> => {
        const model = req.body;
        model.password = bcrypt.hashSync(
            model.password + application_config.bcrypt_paper,
            application_config.bcrypt_salt
        );

        let target_model = await _repo.create(model);
        return hidePassword(target_model);
    };

    static update = async (req: Request): Promise<User | null> => {
        const model = req.body;
        if (model.password) {
            model.password = bcrypt.hashSync(
                model.password + application_config.bcrypt_paper,
                application_config.bcrypt_salt
            );
        }
        const model_id = req.params.id;
        let target_model = await _repo.update(model, Number(model_id));
        return hidePassword(target_model);
    };
}
