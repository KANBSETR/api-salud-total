import { pool } from '../db.js';

export const getMedico = async () => {
    const result = await pool.query('SELECT * FROM medico');
    return result;
};

export const getMedicoByRut= async (rut) => {
    const result = await pool.query("SELECT * FROM usuario WHERE rut = $1", [rut]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}

export const getMedicoById = async (id) => {
    const result = await pool.query("SELECT * FROM medico WHERE idmedico = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}

export const getMedicoByIdEspecialidad = async (idEspecialidad) => {
    const result = await pool.query("SELECT * FROM medico WHERE idEspecialidad = $1", [idEspecialidad]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows;
}


export const horarioMedico = async (id) => {
    const result = await pool.query("SELECT * FROM horario WHERE idmedico = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("Horario no encontrado");
    }
    return result.rows;
}