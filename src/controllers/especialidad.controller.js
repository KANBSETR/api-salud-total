import { getEspecialidades, createEspcialidad } from '../models/especialidad.model.js';

export const getAllEspecialidadesController = async (req, res, next) => {
    try {
        const especialidades = await getEspecialidades();
        res.json(especialidades.rows);
    } catch (error) {
        res.status(404).json({
            message: 'No se encontraron especialidades',
            error: error.message
        });
        next(error);
    }
}


export const createEspcialidadController = async (req, res) => {
    try {
        const especialidad = await createEspcialidad(req.body);
        res.status(201).json({
            message: 'Especialidad creada correctamente',
            especialidad
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la especialidad',
            error: error.message
        });
    }

}