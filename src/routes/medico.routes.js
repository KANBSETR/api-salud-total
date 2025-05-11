import { Router } from "express";
import { getMedicoController } from "../controllers/medico.controller.js";

const router = Router();

//Get Medico
router.get("/medico", getMedicoController)


export default router;