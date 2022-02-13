import DB from '../database'

interface BaseRepositoryInterface<T> {
    index(): Promise<T[]>

    get(id: number, column: string): Promise<T>

    delete(id: number): Promise<boolean>
}

type BaseRepositoryInterfaceType<T> = BaseRepositoryInterface<T>

export default abstract class BaseRepository<T> implements BaseRepositoryInterfaceType<T> {

    constructor(public table: string) {
    }


    async index(filter?: object): Promise<T[]> {
        const filter_query = filter ? `WHERE ${Object.keys(filter)[0]} = '${Object.values(filter)[0]}'` : '';
        const result = await DB.query(`SELECT * FROM ${this.table} ${filter_query}`);
        return result.rows;
    }

    async get(value: number | string, column: string): Promise<T> {
        const result = await DB.query(`SELECT * FROM ${this.table} WHERE ${column} = $1`, [value]);
        return result.rows[0];
    }

    async create(model: Partial<T>): Promise<T> {
        const queryText = `INSERT INTO ${this.table} 
        (${Object.keys(model).join(', ')}) 
        VALUES 
        (${Object.keys(model).map((value, index) => `$${index + 1}`).join(', ')}) 
        RETURNING *`;
        const result = await DB.query(queryText, Object.values(model));
        return result.rows[0];
    }


    async update(model: Partial<T>): Promise<T> {
        const columns = Object.keys(model).filter(key => key != 'id');
        const values = Object.values(model);
        const queryText = `UPDATE ${this.table} 
                            SET ${columns.map((column, index) => `${column} = $${index + 2}`).join(', ')} 
                            WHERE id = $1 RETURNING *`;
        const result = await DB.query(queryText, values);
        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const result = await DB.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
        return result.rowCount > 0;
    }
}
