import express from "express";
import { create, getAll, get, update, remove } from "../controllers/category";
import { checkPermission } from "../Middlewares/CheckPermission";
const router = express.Router();

router.get("/cart", getAll)
router.get("/cart/:id", get)
router.post("/cart", checkPermission, create)
router.put("/cart/:id", checkPermission, update)
router.delete("/cart/:id", checkPermission, remove)

export default router;