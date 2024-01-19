import express from "express";
import { login } from "../../../middleware/members/AuthMiddleware";

const router = express.Router();

router.post("/login",login);

export default router;