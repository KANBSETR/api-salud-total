import { createPacienteController, getPacientesController, updatePacienteController } from "../controllers/paciente.controller.js";

import { Router } from "express";

const router = Router();


// Rutas para Paciente
router.post("/pacientes", createPacienteController);
router.get("/pacientes", getPacientesController);
router.put("/pacientes/:id", updatePacienteController);


export default router;