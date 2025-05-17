import { pool } from '../db.js';

export const getMedico = async () => {
    const result = await pool.query('SELECT * FROM medico');
    return result;
};

export const getMedicoByRut= async (id) => {
    const result = await pool.query("SELECT * FROM medico WHERE rut = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}