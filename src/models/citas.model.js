import { pool } from "../db.js";

export const createCitaModel = async (cita) => {
    const { token, fecha, horaInicio, horaTermino, id_paciente, id_medico } = cita;
    console.log("Datos de la cita:", cita);
    const result = await pool.query("INSERT INTO Cita (fecEn, horaCitaInicio, horaCitaTermino, motivoCita, token_cita, idMedico, idPaciente, idSeguro, idEstado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
        [fecha, horaInicio, horaTermino, " ", token, id_medico, id_paciente, 1, 2]
    )
    if (result.rowCount === 0) {
        throw new Error("Error al crear la cita");
    }
    return result.rows[0];
}

export const getCitasModel = async () => {
    const result = await pool.query("SELECT * FROM cita");
    return result.rows;
}

export const updateStateCitaConfirmModel = async (token_cita) => {
    const result = await pool.query("UPDATE cita SET idestado = $1 WHERE token_cita = $2 RETURNING *;", [2, token_cita]);
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar el estado de la cita");
    }
    return result.rows[0];
}

export const updateStateCitaCancelModel = async (token_cita) => {
    const result = await pool.query("UPDATE cita SET idestado = $1 WHERE token_cita = $2 RETURNING *;", [3, token_cita]);
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar el estado de la cita");
    }
    return result.rows[0];
}

export const getCitaByIdCitaModel = async (id_cita) => {
    const result = await pool.query("SELECT * FROM cita WHERE idcita = $1", [id_cita]);
    if (result.rowCount === 0) {
        throw new Error("No se encontraron citas para el id proporcionado");
    }
    return result.rows[0];
}

export const updateCitaModel = async (cita) => {
    const { fecha, horaInicio, horaTermino, id_medico, motivo, id_paciente, id_cita } = cita;
    const query = `
        UPDATE cita SET fecen = $1, horacitainicio = $2, horacitatermino = $3, motivocita = $4, idmedico = $5, idpaciente = $6, idestado = $7
        WHERE idcita = $8 RETURNING *;
        `;
    const result = await pool.query(query, [fecha, horaInicio, horaTermino, motivo, id_medico, id_paciente,1, id_cita]); // 1 es el id del estado "Pendiente"
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar la cita");
    }
    return result.rows[0];
}

/// ------------------ Nuevo Módulo ------------------ ///

// Obtener las citas de un paciente según el rut
export const getCitasPacienteByRut = async (rut) => {
    const query = `
    SELECT ci.idcita, ci.fecen, ci.horacitainicio, ci.horacitatermino, ci.idmedico, ci.token_cita
    FROM cita ci JOIN Paciente pc ON (ci.idpaciente = pc.idpaciente)
	JOIN Usuario us ON (us.idusuario = pc.idusuario)
	WHERE us.rut = $1 AND ci.idestado = $2;`
    const result = await pool.query(query, [rut, 2]); // 2 es el id del estado "Confirmada"
    return result.rows;
}


export const getInfoForCitaMedico = async (rutMedico) => {
    const query = `
    SELECT md.idmedico, us.nombre, us.appaterno, us.apmaterno, esp.nomespe
    FROM usuario us 
    JOIN medico md ON(us.idusuario = md.idusuario)
    JOIN especialidad esp ON(md.idespecialidad = esp.idespecialidad)
    WHERE us.rut = $1;
    `
    const result = await pool.query(query, [rutMedico]);
    if (result.rowCount === 0) {
        throw new Error("No se encontraron resultados");
    }
    return result.rows[0];
}

export const getInfoForCitaPaciente = async (rutPaciente) => {
    const query = `
    SELECT pc.idpaciente, us.nombre, us.appaterno, us.apmaterno
    FROM usuario us 
    JOIN paciente pc ON(us.idusuario = pc.idusuario)
    WHERE us.rut = $1;
    `
    const result = await pool.query(query, [rutPaciente]);
    if (result.rowCount === 0) {
        throw new Error("No se encontraron resultados");
    }
    return result.rows[0];
}