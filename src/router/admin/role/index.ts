import express from "express";
import { getRolesMiddleware, createRoleMiddleware, getRoleByIDMiddleware, updateRoleMiddleware, deleteRoleMiddleware } from "../../../middleware/admin/RoleMiddleware";
import { checkAuth } from "../../../middleware/AuthMiddleware";
const router = express.Router();

router.get("/roles", checkAuth, getRolesMiddleware);
router.post("/add", createRoleMiddleware);
router.get("/roles/:id", getRoleByIDMiddleware);
router.put("/roles/:id", updateRoleMiddleware);
router.delete("/roles/:id", deleteRoleMiddleware);

export default router;