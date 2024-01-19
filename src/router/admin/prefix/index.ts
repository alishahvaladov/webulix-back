import express from "express";
import { addPrefixController, getAllPrefixController } from "../../../controller/admin/PrefixController";
const router = express.Router();

router.post("/add", addPrefixController);
router.get("/prefixes", getAllPrefixController);

export default router;