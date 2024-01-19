import express from "express";
import { addErrorReasonController, getAllErrorReasonController } from "../../../controller/admin/ErrorReasonController";
const router = express.Router();

router.post("/add", addErrorReasonController);
router.get("/error-reasons", getAllErrorReasonController);

export default router;