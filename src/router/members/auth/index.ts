import express from "express";
import { login, refreshPrimaryToken } from "../../../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login",login);
router.get("/refresh-token", refreshPrimaryToken);

export default router;