import express from "express";
import { 
    getAllAccount, 
    getAccountById 
} from "../controllers/googleAccount";

const router = express.Router();

router.get("/accounts", getAllAccount);
router.get("/accounts/:id", getAccountById);

export default router;
