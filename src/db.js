import { Sequelize } from 'sequelize';
import { PG_USER, PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_URL} from './config.js';

export const sequelize = new Sequelize(PG_URL);

try{
    await sequelize.authenticate(); // Probar la conexión
    console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}



// Configuracion de la base de datos - PG Pool
import pg from 'pg';

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