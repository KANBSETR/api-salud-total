import { Router } from "express";
import { getMedicoController, getMedicoByRutController } from "../controllers/medico.controller.js";

const router = Router();

router.get("/", getMedicoController)
router.get("/:rut", getMedicoByRutController)

export default router;