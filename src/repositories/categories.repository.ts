import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {CategoriesModel} from "../models/categories.model";

export default class CategoriesRepository extends BaseRepository<CategoriesModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.categories;
  }
}
