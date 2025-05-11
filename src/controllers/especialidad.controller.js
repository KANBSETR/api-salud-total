import { getEspecialidades } from '../models/especialidad.model.js';

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