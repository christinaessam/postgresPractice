import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); //  initializes the environment variables

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env; // destructuring 

const db = new Pool({
    host:DB_HOST,
    database:DB_NAME,
    user:DB_USER,
    password:DB_PASSWORD
});

export default db;