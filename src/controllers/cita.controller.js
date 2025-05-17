import { sendEmailCita } from "../libs/resend.js";
import { getMedicoByRut } from "../models/medico.model.js";
import { createCitaModel } from "../models/citas.model.js";
import { getPacienteByRut } from "../models/paciente.model.js";
import { getEspecialidadById } from "../models/especialidad.model.js";
import { v4 } from "uuid";

export const createCita = async (req, res) => {
    const { fecha, hora, rutMedico, rutPaciente, idSeguro, idEspecialidad} = req.body;
    // Crear token para la verificación de la cita
    const token = v4();    
    // Almacenar la cita en la base de datos
    const medico = await getMedicoByRut(rutMedico); // Esto devuelve todos los datos    
    const paciente = await getPacienteByRut(rutPaciente); // Esto devuelve todos los datos
    const especialidad = await getEspecialidadById(idEspecialidad); // Esto devuelve todos los datos

    const saveCita = await createCitaModel({token, fecha, hora, motivoCita: especialidad.nomespe, idMedico: medico.idMedico, idPaciente: paciente.idPaciente, idSeguro});
    // Enviar correo al usuario con la información de la cita
    // Objeto con el contenido del correo
    const dataCorreo = {
        fecha: fecha,
        hora: hora,
        nombreMedico: medico.nombreMedico,
        especialidad: especialidad.nombre,
        correo: paciente.correo,
        nombrePaciente: paciente.nombre,
        token: token,
    }
    // Enviar correo al usuario con la información de la cita
    await sendEmailCita(paciente.correo, dataCorreo);
    // Enviar respuesta al cliente
    res.status(200).json({
        message: "Correo enviado correctamente",
        data: saveCita,
    });
}

export const confirmCita = async (req, res) =>{
    const { token } = req.query;
    // Buscar el token de la cita en la base de datos
    // Si el token no existe, enviar error al cliente "No se pudo confirmar la cita"
    // Si el token existe, actualizar el estado de la cita en la base de datos
    // Enviar respuesta al cliente con el estado de la cita
    res.status(200).json({
        message: "Cita confirmada correctamente"
    });
}
// Obtener todas las citas
// Obtener cita por rut del paciente
// Actualizar cita
// Eliminar cita
export const getCitas = async (req, res) => {
    // Obtener todas las citas de la base de datos
    // Enviar respuesta al cliente con la lista de citas
    res.status(200).json({
        message: "Citas obtenidas correctamente",
        data: [],
    });
}

export const getCitaByRut = async (req, res) => {
    const { rut } = req.body;
    // Obtener la cita por el rut del paciente de la base de datos
    // Enviar respuesta al cliente con la cita
    res.status(200).json({
        message: "Cita obtenida correctamente",
        data: {},
    });
}

export const updateCita = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, nombreMedico, especialidad } = req.body;
    // Actualizar la cita en la base de datos
    // Enviar respuesta al cliente con la cita actualizada
    res.status(200).json({
        message: "Cita actualizada correctamente",
        data: {},
    });
}

export const deleteCita = async (req, res) => {
    const { id } = req.params;
    // Eliminar la cita de la base de datos
    // Enviar respuesta al cliente con el estado de la cita eliminada
    res.status(200).json({
        message: "Cita eliminada correctamente",
        data: {},
    });
}