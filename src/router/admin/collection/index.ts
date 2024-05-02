import express from "express";
import { getCollectionMiddleware } from "../../../middleware/admin/CollectionMiddleware";
const router = express.Router();

router.get("/collections", getCollectionMiddleware);

export default router;