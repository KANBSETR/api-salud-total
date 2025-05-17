import { pool } from "../db.js";

// Crear un nuevo paciente
// Modificar un paciente de forma parcial
// Obtener los pacientes de la base de datos
// Si hay otra cosa que hacer, se puede agregar aquí (Ahora no me acuerdo)

export const getPacientes = async () => {
    const result = await pool.query("SELECT * FROM paciente;");
    return result.rows;
}

export const getPacienteByRut = async (rut) => {
    const result = await pool.query("SELECT * FROM paciente WHERE rutPaciente = $1;", [rut]);
    if (result.rowCount === 0) {
        throw new Error("Paciente no encontrado");
    }
    return result.rows[0];
}



export const updatePaciente = async (id, paciente) => {
    const { nombresPaciente, apellidosPaciente, email, fecNac, telefono, direccion, estado} = paciente;
    try {
        const result = await pool.query("UPDATE paciente SET nombresPaciente = $1, apellidosPaciente = $2, email = $3, fecNac = $4, telefono = $5, direccion = $6, estado = $7 WHERE idPaciente = $8 RETURNING *;", 
                                        [nombresPaciente, apellidosPaciente, email, fecNac, telefono, direccion, estado, id]);
        return result;
    } catch (error) {
        console.error("Error updating paciente:", error);
        throw error;
    }
}

export const createPaciente = async (paciente) => {
    const { nombresPaciente, apellidosPaciente, email, fecNac, 
            telefono, direccion, fechaRegistro, estado, idHistorial} = paciente;
    try {
        const result = await pool.query("INSERT INTO paciente (nombresPaciente, apellidosPaciente, email, fecNac, telefono, direccion, fechaRegistro, estado, idHistorial) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;", 
                                        [nombresPaciente, apellidosPaciente, email, fecNac, telefono, direccion, fechaRegistro, estado, idHistorial]);
        return result;
    } catch (error) {
        console.error("Error creating paciente:", error);
        throw error;
    }
}