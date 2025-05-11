import { pool } from '../db.js';

export const getEspecialidades = async () => {
    const result = await pool.query('SELECT * FROM especialidad');
    return result;
};
