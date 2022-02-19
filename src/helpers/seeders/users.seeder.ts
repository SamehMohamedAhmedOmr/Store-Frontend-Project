import { User } from '../../models/user.model'
import DB from '../../database'
import bcrypt from "bcrypt";
import application_config from "../../config/app.config";
import UsersRepository from "../../repositories/users.repository";

const _repo = new UsersRepository();

const plain_password = '123456'

const password = bcrypt.hashSync(
    plain_password + application_config.bcrypt_paper,
    application_config.bcrypt_salt
);

const data: User[] = [
    { first_name: 'Sameh', last_name: 'Omar', email: 'sameh@gmail.com', password }
]

export default async function seed() {
    console.log('> Seeding users...')
    for (const user of data) {
        const target_user = await _repo.get(user.email, 'email');
        if (!target_user){
            const inserted_user = await _repo.create(user);
        }
    }
    return;
}
