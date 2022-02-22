import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import { CartItemsModel } from '../models/cart.items.model';
import DB from '../database';

export default class CartItemsRepository extends BaseRepository<CartItemsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.cart_items;
  }

  async index(filter?: object): Promise<CartItemsModel[]> {
    const filter_query = filter
      ? `WHERE ${Object.keys(filter)[0]} = '${Object.values(filter)[0]}'`
      : '';
    const result = await DB.query(
      `SELECT *
             FROM ${this.table},
                  ${DB_TABLES.products} ${filter_query} AND products.id = cart_items.product_id`
    );
    return result.rows;
  }

  async checkCARTITEM(
    value_1: number | undefined,
    column_1: string = 'cart_id',
    value_2: number,
    column_2: string = 'product_id'
  ): Promise<CartItemsModel> {
    const result = await DB.query(
      `SELECT *
             FROM ${this.table}
             WHERE ${column_1} = $1
               AND ${column_2} = $2`,
      [value_1, value_2]
    );
    return result.rows[0];
  }

  async deleteCARTITEM(
    value_1: number | undefined,
    column_1: string = 'cart_id',
    value_2: number,
    column_2: string = 'product_id'
  ): Promise<CartItemsModel> {
    const result = await DB.query(
      `Delete
             FROM ${this.table}
             WHERE ${column_1} = $1
               AND ${column_2} = $2`,
      [value_1, value_2]
    );
    return result.rows[0];
  }

  async clearCart(
    value_1: number | undefined,
    column_1: string = 'cart_id'
  ): Promise<CartItemsModel> {
    const result = await DB.query(
      `Delete
             FROM ${this.table}
             WHERE ${column_1} = $1`,
      [value_1]
    );
    return result.rows[0];
  }
}
