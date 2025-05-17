import { pool } from "../db.js";

export const createCitaModel = async (cita) => {
    const {token, fecha, hora, motivoCita, idMedico, idPaciente, idSeguro} = cita;
    const query = `
        INSERT INTO citas (token, fecha, hora, motivoCita, idMedico, idPaciente, idSeguro)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [token, fecha, hora, motivoCita, idMedico, idPaciente, idSeguro];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
        throw new Error("Error al crear la cita");
    }
    return result.rows[0];
}