import express from "express";
import { addSeverityController, getAllSeverityController } from "../../../controller/admin/SeverityController";
const router = express.Router();

router.post("/add", addSeverityController);
router.get("/severities", getAllSeverityController);

export default router;