import { Router } from "express";

import { getPrevisionController } from "../controllers/prevision.controller.js";

const router = Router();

// Rutas para Previsión
router.get("/", getPrevisionController);


export default router;