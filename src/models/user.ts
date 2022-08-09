import db from "../database";
import bcrypt from "bcrypt";

export type User={
    id :number,
    name :string,
    phone :string,
    gender :string,
    birthdate :Date
}

export class UserModel{
    async index():Promise<User[]>{
        try {
            const conn=await db.connect();
            const sql="SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return  result.rows;
        } catch (error) {
            throw new Error(`can't get users ${error}`);
        }
    }
}