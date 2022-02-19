import DB_TABLES from './db.tables';
import BaseRepository from './base.repository';
import {CartItemsModel} from "../models/cart.items.model";

export default class CartItemsRepository extends BaseRepository<CartItemsModel> {
  constructor() {
    super('');
    this.table = DB_TABLES.cart_items;
  }
}
