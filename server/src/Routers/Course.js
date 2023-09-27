import express from "express";
import { create, getAll, get, update, remove } from "../controllers/product";
import { checkPermission } from "../Middlewares/CheckPermission";
const router = express.Router();

router.get("/product", getAll)
router.get("/product/:id", get)
router.post("/product",checkPermission, create)
router.patch("/product/:id",checkPermission, update)
router.delete("/product/:id",checkPermission, remove)

export default router;