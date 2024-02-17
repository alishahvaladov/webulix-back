import express from "express";
import { login } from "../../../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login",login);

export default router;