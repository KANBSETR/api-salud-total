export const PG_USER = process.env.PG_USER || 'postgres';
export const PG_PASSWORD = process.env.PG_PASSWORD || 'password';
export const PG_HOST = process.env.PG_HOST || 'localhost';
export const PG_PORT = process.env.PG_PORT || 5432;
export const PG_DATABASE = process.env.PG_DATABASE || 'salud-total';
export const PG_URL = process.env.PG_URL || `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;