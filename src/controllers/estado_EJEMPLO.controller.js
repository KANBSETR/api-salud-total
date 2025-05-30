
// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS
//
//
// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS
//
//
// ARCHIVO SOLO PAR EFECTOS DE PRUEBAS, NO VAMOS A RECUPERAR DATOS DE LA TABLA ESTADOS

import { Estados } from "../models/Estados.js";

export const getEstados = async (req, res) => {
    try {
        const estados = await Estados.findAll();
    } catch (error) {
        console.error('Error al obtener los estados:', error);
        res.status(500).json({ message: 'Error al obtener los estados' });
    }
}