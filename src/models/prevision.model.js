import { pool } from "../db.js";


export const getPrevision = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM seguro");
        return result.rows;
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las previsiones" });
    }
}