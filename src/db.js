import pg from 'pg';

export const pool = new pg.Pool({
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT || 5432,
});

pool.on('connect', () => {
    console.log('connected to the db');
});
