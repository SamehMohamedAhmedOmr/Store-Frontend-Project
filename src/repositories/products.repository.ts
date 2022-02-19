import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {ProductsModel} from "../models/products.model";

export default class ProductsRepository extends BaseRepository<ProductsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.products;
  }
}
