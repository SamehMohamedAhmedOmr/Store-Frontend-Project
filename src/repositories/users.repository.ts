import DB_TABLES from './db.tables'
import BaseRepository from "./base.repository";
import {User} from "../models/user.model";

export default class UsersRepository extends BaseRepository<User> {

    constructor() {
        super('')
        this.table = DB_TABLES.users
    }

}
