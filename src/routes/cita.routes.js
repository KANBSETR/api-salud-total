import { Router } from "express";
import {
    createCita,
    confirmCita,
    getCitas,
    cancelCita,
    getCitasByRut,
    updateCita,
    getCitaById
} from "../controllers/cita.controller.js";

const router = Router();

router.get("/", getCitas);

router.get("/rut/:rut", getCitasByRut);

router.get("/id/:id_cita", getCitaById);

router.put("/actualizar/:id_cita", updateCita);

router.post("/create", createCita);

router.get("/confirmar", confirmCita);

router.get("/cancelar", cancelCita);


export default router;
