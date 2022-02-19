import DB from '../database';
import BaseRepositoryInterfaceType from './Interface/base.repository.interface';

export default abstract class BaseRepository<T>
  implements BaseRepositoryInterfaceType<T>
{
  constructor(public table: string) {}

  async index(filter?: object): Promise<T[]> {
    const filter_query = filter
      ? `WHERE ${Object.keys(filter)[0]} = '${Object.values(filter)[0]}'`
      : '';
    const result = await DB.query(
      `SELECT * FROM ${this.table} ${filter_query}`
    );
    return result.rows;
  }

  async get(value: number | string, column: string = 'id'): Promise<T> {
    const result = await DB.query(
      `SELECT * FROM ${this.table} WHERE ${column} = $1`,
      [value]
    );
    return result.rows[0];
  }

  async create(model: Partial<T>): Promise<T> {
    let columns = Object.keys(model).join(', ');
    let values = Object.keys(model)
      .map((value, index) => `$${index + 1}`)
      .join(', ');
    const queryText = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING *`;
    const result = await DB.query(queryText, Object.values(model));
    return result.rows[0];
  }

  async update(model: Partial<T>, id: number): Promise<T> {
    const columns = Object.keys(model).filter((key) => key != 'id');
    const values = Object.values(model).filter((key) => key != 0);
    const columns_values = columns
      .map((column, index) => `${column} = $${index + 1}`)
      .join(', ');

    const queryText = `UPDATE ${this.table} SET ${columns_values} WHERE id = ${id} RETURNING *`;
    const result = await DB.query(queryText, values);
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await DB.query(`DELETE FROM ${this.table} WHERE id = ${id}`, [
      id,
    ]);
    return result.rowCount > 0;
  }
}
