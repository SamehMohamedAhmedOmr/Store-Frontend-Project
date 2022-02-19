import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {CartModel} from "../models/cart.model";

export default class CartRepository extends BaseRepository<CartModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.cart;
  }
}
