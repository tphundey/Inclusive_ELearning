import express from "express";
import {
  getAllUser,
  getUserById,
  removeUser,
  updateUser,
} from "../controllers/user";

const router = express.Router();
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

export default router;
