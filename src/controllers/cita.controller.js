import { sendEmailCita } from "../libs/resend.js";
import { getMedicoByRut } from "../models/medico.model.js";
import { createCitaModel, getCitasModel, updateStateCitaModelConfirm, updateStateCitaModelCancel } from "../models/citas.model.js";
import { getPacienteByRut } from "../models/paciente.model.js";
import { getEspecialidadById } from "../models/especialidad.model.js";
import { v4 } from "uuid";

export const createCita = async (req, res) => {
    const { fecha, hora, rut_medico, rut_paciente, id_especialidad} = req.body;
    // Crear token para la verificación de la cita
    const token = v4();    
    // Obtener los datos necesarios para crear la cita
    const medico = await getMedicoByRut(rut_medico);
    const paciente = await getPacienteByRut(rut_paciente);
    const especialidad = await getEspecialidadById(id_especialidad);
    
    // Almacenar la cita en la base de datos
    const saveCita = await createCitaModel({token, fecha, hora, id_medico: medico.id_medico, id_paciente: paciente.id_paciente});
    // Objeto con el contenido del correo
    const dataCorreo = {
        fecha: fecha,
        hora: hora,
        nombre_medico: medico.primer_nombre + " " + medico.apellido_paterno,
        especialidad: especialidad.especialidad,
        nombre_paciente: paciente.primer_nombre,
        correo: paciente.correo,
        token: token,
    }
    // Enviar correo al usuario con la información de la cita
    await sendEmailCita(dataCorreo);
    // Enviar respuesta al cliente
    res.status(200).json({
        message: "Cita creada y correo enviado correctamente",
        data: saveCita,
    });
}

export const confirmCita = async (req, res) =>{
    const { token } = req.query;
    // Buscar el token de la cita en la base de datos
    const cita = await updateStateCitaModelConfirm(token);
    // Si el token no existe, enviar error al cliente "No se pudo confirmar la cita"
    // Si el token existe, actualizar el estado de la cita en la base de datos
    // Enviar respuesta al cliente con el estado de la cita
    res.status(200).json({
        message: "Cita confirmada correctamente",
        data: cita,
    });
}

export const cancelCita = async (req, res) => {
    const { token } = req.query;
    // Buscar el token de la cita en la base de datos
    const cita = await updateStateCitaModelCancel(token);
    // Si el token no existe, enviar error al cliente "No se pudo cancelar la cita"
    // Si el token existe, eliminar la cita de la base de datos
    // Enviar respuesta al cliente con el estado de la cita
    res.status(200).json({
        message: "Cita cancelada correctamente",
        data: cita,
    });
}

// Obtener todas las citas
// Obtener cita por rut del paciente
// Actualizar cita
// Eliminar cita
export const getCitas = async (req, res) => {
    // Obtener todas las citas de la base de datos
    const citas = await getCitasModel();
    // Enviar respuesta al cliente con la lista de citas
    if (citas.length === 0) {
        return res.status(404).json({
            message: "No se encontraron citas",
        });
    }
    res.status(200).json(citas);
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