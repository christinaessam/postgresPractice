import db from "../database";

export type Book = {
	id: number;
	title: string;
	author: string;
	total_pages: number;
	type: string;
	summary: string;
};

export class BookLibrary {
	async index(): Promise<Book[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM books";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`can't get books ${error}`);
		}
	}

	async create(b: Book): Promise<Book> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *";
			const result = await conn.query(sql, [
				b.title,
				b.author,
				b.total_pages,
				b.summary,
			]);
			conn.release();
			const book: Book = result.rows[0];
			return book;
		} catch (err) {
			throw new Error(`Could not add new book. Error: ${err}`);
		}
	}

	async show(id: string): Promise<Book> {
		try {
			const sql = "SELECT * FROM books WHERE id=($1)";
			// @ts-ignore
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find book ${id}. Error: ${err}`);
		}
	}

	async delete(id: string): Promise<Book> {
		try {
			const sql = "DELETE FROM books WHERE id=($1)";
			// @ts-ignore
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			const book = result.rows[0];
			conn.release();
			return book;
		} catch (err) {
			throw new Error(`Could not delete book ${id}. Error: ${err}`);
		}
	}
}
