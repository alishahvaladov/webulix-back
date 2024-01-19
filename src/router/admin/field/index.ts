import express from "express";
import { addFieldController, getAllFieldController } from "../../../controller/admin/FieldController";

const router = express.Router();

router.post("/add", addFieldController);
router.get("/fields", getAllFieldController);

export default router;