import { Router } from "express";
import { createCita, confirmCita } from "../controllers/cita.controller.js";

const router = Router();

router.post("/", createCita);
router.get("/confirmar", confirmCita);

export default router;
