import { getPrevision } from "../models/prevision.model.js";


export const getPrevisionController = async (req, res) => {
    try {
        const result = await getPrevision();
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las previsiones" });
    }
}