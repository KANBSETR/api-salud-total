import { sendEmailCita, sendEmailUpdateCita } from "../libs/resend.js";
import {
    createCitaModel,
    getCitaByIdCitaModel,
    getCitasModel,
    updateCitaModel,
    updateStateCitaCancelModel,
    updateStateCitaConfirmModel,
    getCitasPacienteByRut,
    getInfoForCitaMedico,
    getInfoForCitaPaciente,
} from "../models/citas.model.js";
import { v4 } from "uuid"; // Para generar el token de la cita...
// import { parse } from 'date-fns';

export const createCita = async (req, res) => {
    const { fecha, horaInicio, horaTermino, correo, rutMedico, rutPaciente } = req.body;
    // Crear token para la verificación de la cita
    const token = v4();
    // Obtener los datos necesarios para crear la cita
    const medico = await getInfoForCitaMedico(rutMedico);
    const paciente = await getInfoForCitaPaciente(rutPaciente);

    // const fechaHoraInicioStr = `${fecha} ${horaInicio}`;
    // const fechaHoraTerminoStr = `${fecha} ${horaTermino}`;

    // // PARSEAR las fechas y horas a objetos Date
    // const horaCitaInicio = parse(fechaHoraInicioStr, 'dd/MM/yyyy HH:mm', new Date());
    // const horaCitaTermino = parse(fechaHoraTerminoStr, 'dd/MM/yyyy HH:mm', new Date());
    // const fechaSQL = horaCitaInicio.toISOString().split('T')[0];

    // Guardar en la base de datos
    const saveCita = await createCitaModel({
        token,
        fecha: fecha,
        horaInicio: horaInicio,
        horaTermino: horaTermino,
        id_paciente: paciente.id_paciente,
        id_medico: medico.id_medico
    });
    // Objeto con el contenido del correo
    const dataCorreo = {
        fecha: fecha,
        hora: horaInicio,
        nombre_medico: medico.nombre + " " + medico.ap_paterno + " " + medico.ap_materno,
        especialidad: medico.nom_espe,
        nombre_paciente: paciente.nombre + " " + paciente.ap_paterno + " " + paciente.ap_materno,
        correo: correo,
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

export const confirmCita = async (req, res) => {
    const { token } = req.query;
    // Buscar el token de la cita en la base de datos
    const cita = await updateStateCitaConfirmModel(token);
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
    const { fecha, horaInicio, horaTermino, correo, rutMedico, rutPaciente, motivo } = req.body;
    // Obtener los datos necesarios para crear la cita
    const medico = await getInfoForCitaMedico(rutMedico);
    const paciente = await getInfoForCitaPaciente(rutPaciente);
    const cita = await getCitaByIdCitaModel(id_cita);

    // const fechaHoraInicioStr = `${fecha} ${horaInicio}`;
    // const fechaHoraTerminoStr = `${fecha} ${horaTermino}`;

    // // PARSEAR las fechas y horas a objetos Date
    // const horaCitaInicio = parse(fechaHoraInicioStr, 'dd/MM/yyyy HH:mm', new Date());
    // const horaCitaTermino = parse(fechaHoraTerminoStr, 'dd/MM/yyyy HH:mm', new Date());
    // const fechaSQL = horaCitaInicio.toISOString().split('T')[0];

    const updateCita = await updateCitaModel({
        fecha: fecha,
        horaInicio: horaInicio,
        horaTermino: horaTermino,
        id_medico: medico.id_medico, 
        motivo, 
        id_paciente: paciente.id_paciente, 
        id_cita
    });

    // Obtener la cita actualizada
    const dataCorreo = {
        fecha: fecha,
        hora: horaInicio,
        nombre_medico: medico.nombre + " " + medico.ap_paterno + " " + medico.ap_materno,
        especialidad: medico.nom_espe,
        nombre_paciente: paciente.nombre + " " + paciente.ap_paterno + " " + paciente.ap_materno,
        correo: correo,
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
