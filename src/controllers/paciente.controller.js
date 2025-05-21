import { getPacientes, createPaciente, updatePaciente, getPacienteByRut } from "../models/paciente.model.js";

export const getPacientesController = async (req, res, next) => {
    try {
        const result = await getPacientes();
        res.json(result);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching data" });
    }
}

export const getPacienteByRutController = async (req, res, next) => {
    try {
        const { rut } = req.params;
        const result = await getPacienteByRut(rut);
        res.json(result);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error fetching paciente" });
    }
}


export const createPacienteController = async (req, res, next) => {
    try {
        const paciente = req.body;
        const result = await createPaciente(paciente);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error creating paciente" });
    }
}

export const updatePacienteController = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const paciente = req.body;
        const result = await updatePaciente(id, paciente);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Error updating paciente" });
    }
}