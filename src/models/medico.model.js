import { pool } from '../db.js';

export const getMedico = async () => {
    const query = `
    SELECT md.idmedico, us.rut, us.correo, us.nombre, us.appaterno, us.apmaterno, md.idespecialidad
    FROM usuario us
    JOIN medico md ON (md.idusuario = us.idusuario);
    `
    const result = await pool.query(query);
    return result;
};

export const getMedicoByRut = async (rut) => {
    const query = `
    SELECT md.idmedico, us.rut, us.correo, us.nombre, us.appaterno, us.apmaterno, md.idespecialidad
    FROM usuario us 
    JOIN medico md ON (md.idusuario = us.idusuario)
    WHERE us.rut = $1;
    `
    const result = await pool.query(query, [rut]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}

export const getMedicoById = async (id) => {
    const query = `
    SELECT md.idmedico, us.rut, us.correo, us.nombre, us.appaterno, us.apmaterno, md.idespecialidad
    FROM usuario us 
    JOIN medico md ON (md.idusuario = us.idusuario)
    WHERE md.idmedico = $1;
    `
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
        throw new Error("Medico no encontrado");
    }
    return result.rows[0];
}

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