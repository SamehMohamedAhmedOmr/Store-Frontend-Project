import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {ProductsModel} from "../models/products.model";
import DB from "../database";

export default class ProductsRepository extends BaseRepository<ProductsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.products;
  }

  async mostViewed(limit = 5): Promise<ProductsModel[]> {
    const result = await DB.query(
        `SELECT * FROM ${this.table} ORDER By views desc Limit ${limit}`
    );
    return result.rows;
  }
}
