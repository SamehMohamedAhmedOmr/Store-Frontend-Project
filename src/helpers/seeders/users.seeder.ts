import { User } from '../../models/user.model'
import DB from '../../database'
import bcrypt from "bcrypt";
import application_config from "../../config/app.config";

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

        let check_query_text = 'select * from users where email =' + user.email;
        let target = await DB.query(check_query_text);
        if (!target.rows.length){
            let queryText = 'INSERT INTO users (first_name, last_name, email, password) VALUES'
            queryText = (user.first_name, user.last_name, user.email, user.password);
            await DB.query(queryText)
        }
    }
    return
}
