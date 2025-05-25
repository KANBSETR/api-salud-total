import { pool } from '../db.js';

export const getMedico = async () => {
    const result = await pool.query('SELECT * FROM medico');
    return result;
};

export const getMedicoByRut = async (rut) => {
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

// MEJORAR LA CONSULTA PARA TRAER LOS DATOS DEL MÉDICO
export const getMedicoByIdEspecialidad = async (idEspecialidad) => {
    const query = `
    SELECT md.idmedico, us.rut, us.correo, us.nombre, us.appaterno, us.apmaterno, md.idespecialidad
    FROM usuario us 
    JOIN medico md ON (md.idusuario = us.idusuario)
    WHERE md.idespecialidad = $1;
    `
    const result = await pool.query(query, [idEspecialidad]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows;
}

export const horarioMedico = async (id) => {
    const query = `
    SELECT hr.idmedico, diasemana, horainicio, horasalida
    FROM horario hr JOIN medico md ON (hr.idmedico = md.idmedico)
    WHERE hr.idmedico = $1;
`
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
        throw new Error("Horario no encontrado");
    }
    return result.rows;
}