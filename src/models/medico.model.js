import { pool } from '../db.js';

export const getMedico = async () => {
    const result = await pool.query('SELECT * FROM medico');
    return result;
};
