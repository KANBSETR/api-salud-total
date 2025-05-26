import { sendEmailCita, sendEmailUpdateCita } from "../libs/resend.js";
import { getMedicoByRut } from "../models/medico.model.js";
import {
    createCitaModel,
    getCitaByIdCitaModel,
    getCitasByIdModel,
    getCitasModel,
    updateCitaModel,
    updateStateCitaCancelModel,
    updateStateCitaConfirmModel,
    getCitasPacienteByRut,
    getInfoForCitaMedico,
    getInfoForCitaPaciente,
} from "../models/citas.model.js";
import { getPacienteByRut } from "../models/paciente.model.js";
import { getEspecialidadById } from "../models/especialidad.model.js";
import { v4 } from "uuid";

export const createCita = async (req, res) => {
    const { fecha, horaInicio, horaTermino, correo, rutMedico, rutPaciente} = req.body;
    // Crear token para la verificación de la cita
    const token = v4();
    // Obtener los datos necesarios para crear la cita
    const medico = await getInfoForCitaMedico(rutMedico);
    const paciente = await getInfoForCitaPaciente(rutPaciente);
    console.log(medico);
    console.log(paciente);
    // Almacenar la cita en la base de datos
    const saveCita = await createCitaModel({ token, fecha, horaInicio, horaTermino, id_paciente: paciente.idpaciente, id_medico: medico.idmedico });
    // Objeto con el contenido del correo
    const dataCorreo = {
        fecha: fecha,
        hora: horaInicio,
        nombre_medico: medico.nombre + " " + medico.appaterno + " " + medico.apmaterno,
        especialidad: medico.nomespe,
        nombre_paciente: paciente.nombre + " " + paciente.appaterno + " " + paciente.apmaterno,
        correo: correo,
        token: token,
    }
    console.log(dataCorreo);
    // Enviar correo al usuario con la información de la cita
    await sendEmailCita(dataCorreo);
    // Enviar respuesta al cliente
    res.status(200).json({
        message: "Cita creada y correo enviado correctamente",
        data: saveCita,
    });
}

export const confirmCita = async (req, res) => {
    const { token } = req.query;
    // Buscar el token de la cita en la base de datos
    const cita = await updateStateCitaConfirmModel(token);
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
    const cita = await updateStateCitaCancelModel(token);
    // Si el token no existe, enviar error al cliente "No se pudo cancelar la cita"
    // Si el token existe, eliminar la cita de la base de datos
    // Enviar respuesta al cliente con el estado de la cita
    res.status(200).json({
        message: "Cita cancelada correctamente",
        data: cita,
    });
}

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

export const getCitasByRut = async (req, res) => {
    const { rut } = req.params;
    // Obtener el paciente por rut
    const citas = await getCitasPacienteByRut(rut);
    if (citas.length === 0) {
        return res.status(404).json({
            message: "No se encontraron citas para el rut proporcionado",
        });
    }
    res.status(200).json(citas);
}

export const getCitaById = async (req, res) => {
    const { id_cita } = req.params;
    // Obtener la cita por id
    const cita = await getCitaByIdCitaModel(id_cita);
    // Enviar respuesta al cliente con la cita
    res.status(200).json(cita);
}

export const updateCita = async (req, res) => {
    const { id_cita } = req.params;
    const { fecha, hora, rut_medico, rut_paciente, id_especialidad } = req.body;
    // Actualizar la cita en la base de datos
    const medico = await getMedicoByRut(rut_medico);
    const paciente = await getPacienteByRut(rut_paciente);

    const especialidad = await getEspecialidadById(id_especialidad);
    const cita = await getCitaByIdCitaModel(id_cita);
    const updateCita = await updateCitaModel({ id_cita, fecha, hora, id_medico: medico.id_medico });

    // Obtener la cita actualizada
    const dataCorreo = {
        fecha: fecha,
        hora: hora,
        nombre_medico: medico.primer_nombre + " " + medico.apellido_paterno,
        especialidad: especialidad.especialidad,
        nombre_paciente: paciente.primer_nombre,
        correo: paciente.correo,
        token: cita.token_cita,
    }
    // Enviar correo al paciente con la información de la cita actualizada
    await sendEmailUpdateCita(dataCorreo);
    // Enviar respuesta al cliente con la cita actualizada
    res.status(200).json({
        message: "Cita actualizada correctamente",
        data: updateCita,
    });
}

export const getCitasByIdMedico = async (req, res) => {
    const { rut } = req.params;
    const medico = await getMedicoByRut(rut);
    const citas = await getCitasByIdModel(medico.id_medico);
    res.status(200).json(citas);
}
