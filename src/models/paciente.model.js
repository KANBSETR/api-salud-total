import { pool } from "../db.js";

export const getPacientes = async () => {
    const result = await pool.query("SELECT * FROM paciente");
    return result.rows;
}