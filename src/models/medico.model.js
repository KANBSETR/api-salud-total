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

export const getMedicoById = async (id) => {
    const result = await pool.query("SELECT * FROM medico WHERE id_medico = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}

export const getMedicoByIdEspecialidad = async (idEspecialidad) => {
    const result = await pool.query("SELECT * FROM medico WHERE id_especialidad = $1", [idEspecialidad]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows;
}


export const horarioMedico = async (id) => {
    const result = await pool.query("SELECT * FROM horario WHERE id_medico = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Horario no encontrado");
    }
    return result.rows[0];
}