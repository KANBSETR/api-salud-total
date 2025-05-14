import { Router } from "express";
import { createCita } from "../controllers/cita.controller.js";

const router = Router();

router.post("/", createCita);

export default router;
