import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import { OrderItemsModel } from '../models/order.items.model';
import DB from '../database';

export default class OrdersItemsRepository extends BaseRepository<OrderItemsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.order_items;
  }

  async index(filter?: object): Promise<OrderItemsModel[]> {
    const filter_query = filter
      ? `WHERE ${Object.keys(filter)[0]} = '${Object.values(filter)[0]}'`
      : '';
    const result = await DB.query(
      `SELECT *
             FROM ${this.table},
                  ${DB_TABLES.products} ${filter_query} AND products.id = order_items.product_id`
    );
    return result.rows;
  }
}
