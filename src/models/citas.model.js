import { pool } from "../db.js";

export const createCitaModel = async (cita) => {
    const { token, fecha, hora, id_paciente, id_medico } = cita;
    const result = await pool.query("INSERT INTO Cita (fecEn, horaCitaInicio, horaCitaTermino, motivoCita, token_cita, idMedico, idPaciente, idSeguro, idEstado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
                                    [fecha, hora, hora, " ", token, id_medico, id_paciente, 1, 2]
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

export const getCitasByIdModel = async (id_paciente) => {
    const result = await pool.query("SELECT * FROM cita WHERE idPaciente = $1", [id_paciente]);
    if (result.rowCount === 0) {
        throw new Error("No se encontraron citas para el id proporcionado");
    }
    return result.rows;
}

export const getCitaByIdCitaModel = async (id_cita) => {
    const result = await pool.query("SELECT * FROM cita WHERE idcita = $1", [id_cita]);
    if (result.rowCount === 0) {
        throw new Error("No se encontraron citas para el id proporcionado");
    }
    return result.rows[0];
}

export const updateCitaModel = async (cita) =>{
    const { id_cita, fecha, hora, id_medico } = cita; // Se supone que el id_paciente no se puede cambiar
    // Parsear el id a entero
    const result = await pool.query("UPDATE cita SET fecha = $1, hora = $2, id_medico = $3, id_estado = $4 WHERE id_cita = $5 RETURNING *;", [fecha, hora, id_medico, 1, id_cita]); // id_estado = 1 (pendiente)
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar la cita");
    }
    return result.rows[0];
}

export const getCitasOcupadasModel = async (fecha, hora) => {
    const result = await pool.query("SELECT * FROM cita WHERE fecha = $1 AND hora = $2", [fecha, hora]);
    if (result.rowCount === 0) {
        return [];
    }
    return result.rows;
}

/// ------------------ Nuevo Modulo ------------------ ///

// Obtener las citas de un paciente según el rut
export const getCitasPacienteByRut = async (rut) => {
    const query = `
    SELECT ci.idcita, ci.fecen, ci.horacitainicio, ci.horacitatermino, ci.idmedico, ci.token_cita
    FROM cita ci JOIN Paciente pc ON (ci.idpaciente = pc.idpaciente)
	JOIN Usuario us ON (us.idusuario = pc.idusuario)
	WHERE us.rut = $1;`
    const result = await pool.query(query, [rut]);
    return result.rows;
}

