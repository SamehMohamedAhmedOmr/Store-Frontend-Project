import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {CartItemsModel} from "../models/cart.items.model";
import DB from "../database";

export default class CartItemsRepository extends BaseRepository<CartItemsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.cart_items;
  }

  async checkCARTITEM(value_1: number | undefined, column_1: string = 'cart_id',
                      value_2: number, column_2: string = 'product_id'): Promise<CartItemsModel> {
    const result = await DB.query(
        `SELECT * FROM ${this.table} WHERE ${column_1} = $1 AND ${column_2} = $2`,
        [value_1, value_2]
    );
    return result.rows[0];
  }

  async deleteCARTITEM(value_1: number | undefined, column_1: string = 'cart_id',
                      value_2: number, column_2: string = 'product_id'): Promise<CartItemsModel> {
    const result = await DB.query(
        `Delete FROM ${this.table} WHERE ${column_1} = $1 AND ${column_2} = $2`,
        [value_1, value_2]
    );
    return result.rows[0];
  }
}
