import { addCustomErrorController, getAllCustomErrorController } from "../../../controller/admin/CustomErrorController";
import express from "express";

const router = express.Router();

router.get("/custom-errors", getAllCustomErrorController);
router.post("/add", addCustomErrorController);

export default router;