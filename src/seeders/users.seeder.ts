import { User } from '../models/user.model'
import bcrypt from "bcrypt";
import application_config from "../config/app.config";
import UsersRepository from "../repositories/users.repository";

const _repo = new UsersRepository();

const plain_password = '123456'
const email = 'sameh@gmail.com'

const password = bcrypt.hashSync(
    plain_password + application_config.bcrypt_paper,
    application_config.bcrypt_salt
);

const data: User[] = [
    { first_name: 'Sameh', last_name: 'Omar', email: email, password : password, type : 0 }
]

export default async function seed() {
    console.log('> Seeding users...')
    for (const user of data) {
        const target_user = await _repo.get(user.email, 'email');
        if (!target_user){
            await _repo.create(user);
        }
    }
    return;
}
