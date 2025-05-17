import { Router } from "express";
import { createCita, confirmCita, getCitas, cancelCita } from "../controllers/cita.controller.js";

const router = Router();

router.get("/", getCitas);

router.post("/create", createCita);

router.get("/confirmar", confirmCita);
router.get("/cancelar", cancelCita);


export default router;
