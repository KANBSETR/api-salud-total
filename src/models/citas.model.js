import { pool } from "../db.js";

export const createCitaModel = async (cita) => {
    const { token, fecha, hora, id_paciente, id_medico } = cita;
    const result = await pool.query("INSERT INTO cita (token_cita, fecha, hora, id_paciente, id_medico, id_estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        [token, fecha, hora, id_paciente, id_medico, 1] // id_estado = 1 (pendiente)
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

export const updateStateCitaModelConfirm = async (token_cita) => {
    const result = await pool.query("UPDATE cita SET id_estado = $1 WHERE token_cita = $2 RETURNING *;", [2, token_cita]);
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar el estado de la cita");
    }
    return result.rows[0];
}

export const updateStateCitaModelCancel = async (token_cita) => {
    const result = await pool.query("UPDATE cita SET id_estado = $1 WHERE token_cita = $2 RETURNING *;", [3, token_cita]);
    if (result.rowCount === 0) {
        throw new Error("Error al actualizar el estado de la cita");
    }
    return result.rows[0];
}
