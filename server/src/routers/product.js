
import express from "express";
import { create, getAll, get, update, remove } from "../controllers/product";
import { checkPermission } from "../middlewares/checkpermission";
const router = express.Router();

router.get("/product", getAll)
router.get("/product/:id", get)
router.post("/product", create)
router.patch("/product/:id", update)
router.delete("/product/:id", remove)

export default router;