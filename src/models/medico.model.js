import { pool } from '../db.js';

export const getMedico = async () => {
    const result = await pool.query('SELECT * FROM medico');
    return result;
};

export const getMedicoByRut= async (rut) => {
    const result = await pool.query("SELECT * FROM medico WHERE rut_medico = $1", [rut]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}