import { getMedico } from "../models/medico.model.js";

export const getMedicoController = async (req, res, next) => {
    try {
        const result = await getMedico();
        res.json(result.rows);
    } catch (error) {
        res.status(404).json({
            message: 'No se encontraron médicos',
            error: error.message
        });
        next(error);
    }
}


