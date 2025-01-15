import express from "express";
import { getAllUsers } from "../controllers/superadminController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Apply authenticate middleware first, then isAdmin middleware
router.get("/users", authenticate, isAdmin, getAllUsers);

export default router;