import pg from 'pg';
import { PG_USER, PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT} from './config.js';

// export const pool = new pg.Pool({
//     host: PG_HOST,
//     user: PG_USER,
//     password: PG_PASSWORD,
//     database: PG_DATABASE,
//     port: PG_PORT
// });

// Produccion
export const pool = new pg.Pool({
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT,
    ssl:{
        rejectUnauthorized: false
    }
});