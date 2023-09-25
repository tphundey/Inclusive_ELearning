import express from "express";
import { create, getAll, get, update, remove } from "../controllers/category";
import { checkPermission } from "../middlewares/checkpermission";
const router = express.Router();

router.get("/category", getAll)
router.get("/category/:id", get)
router.post("/category", checkPermission, create)
router.put("/category/:id", checkPermission, update)
router.delete("/category/:id", checkPermission, remove)

export default router;