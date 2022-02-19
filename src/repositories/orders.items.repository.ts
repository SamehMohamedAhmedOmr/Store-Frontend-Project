import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {OrderItemsModel} from "../models/order.items.model";

export default class OrdersItemsRepository extends BaseRepository<OrderItemsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.order_items;
  }
}
