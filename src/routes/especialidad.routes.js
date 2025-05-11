import { Router } from "express";
import { getAllEspecialidadesController } from "../controllers/especialidad.controller.js";


const router = Router();

//Rutas
router.get("/especialidad", getAllEspecialidadesController);



export default router;