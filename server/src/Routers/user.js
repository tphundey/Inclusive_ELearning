import express from 'express';
import { getAllUser, getUserById,removeUser,searchUser,updateUser } from '../controllers/user';
import { authenticate } from '../Middlewares/authenticate';
import { authorization } from '../Middlewares/authorization';

const router = express.Router();

// router.get("/users", searchUser);
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", authenticate, authorization, updateUser);
router.delete("/users/:id", authenticate, authorization, removeUser);

export default router;