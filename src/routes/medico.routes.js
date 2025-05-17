import { Router } from "express";
import { getMedicoController } from "../controllers/medico.controller.js";

const router = Router();

router.get("/", getMedicoController)


export default router;