import { Router } from "express";
import { getAllEspecialidadesController, createEspcialidadController } from "../controllers/especialidad.controller.js";



const router = Router();

//Rutas
router.get("/", getAllEspecialidadesController);

router.post("/create", createEspcialidadController);

export default router;