import { createPacienteController, getPacientesController, updatePacienteController } from "../controllers/paciente.controller.js";

import { Router } from "express";

const router = Router();


// Rutas para Paciente
router.post("/create", createPacienteController);
router.get("/", getPacientesController);
router.put("/update/:id", updatePacienteController);

export default router;