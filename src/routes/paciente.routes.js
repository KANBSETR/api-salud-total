import { createPacienteController, getPacientesController, updatePacienteController, getPacienteByRutController } from "../controllers/paciente.controller.js";

import { Router } from "express";

const router = Router();


// Rutas para Paciente
router.get("/", getPacientesController);
router.get("/rut/:rut", getPacienteByRutController);
router.post("/create", createPacienteController);
router.put("/update/:id", updatePacienteController);

export default router;