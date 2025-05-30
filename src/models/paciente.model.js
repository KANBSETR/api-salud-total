import { pool } from "../db.js";

export const getPacientes = async () => {
    const query = `
    SELECT pc.idpaciente, us.rut, us.nombre, us.appaterno, us.apmaterno, us.idusuario
    FROM usuario us JOIN paciente pc ON (us.idusuario = pc.idusuario)
    `;
    const result = await pool.query(query);
    return result.rows;
}