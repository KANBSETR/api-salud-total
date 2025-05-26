import { pool } from '../db.js';

export const getEspecialidades = async () => {
    const result = await pool.query('SELECT * FROM especialidad');
    return result;
};

export const getEspecialidadById = async (id) => {
    const result = await pool.query('SELECT * FROM especialidad WHERE idespecialidad = $1', [id]);
    return result.rows[0];
};