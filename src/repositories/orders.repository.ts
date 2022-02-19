import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {OrdersModel} from "../models/orders.model";

export default class OrdersRepository extends BaseRepository<OrdersModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.orders;
  }
}
