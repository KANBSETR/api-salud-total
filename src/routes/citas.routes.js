import { Router } from "express";
import { sendEmailTest } from "../controllers/citas.controller.js";

const router = Router();


router.get("/testEmail", sendEmailTest);

export default router;