import { pool } from '../db.js';

export const getEspecialidades = async () => {
    const result = await pool.query('SELECT * FROM especialidad');
    return result;
};


export const createEspcialidad = async (especialidad) => {
    const { nombre } = especialidad;
    try {
        const result = await pool.query(
            'INSERT INTO especialidad (nomespe) VALUES ($1) RETURNING *',
            [nombre]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating especialidad:', error);
        throw error;
    }
}

export const getEspecialidadById = async (id) => {
    const result = await pool.query('SELECT * FROM especialidad WHERE id_especialidad = $1', [id]);
    return result.rows[0];
};