import express from "express";
import {
  createAAT1,
  createAAT2,
  createRemedialSession,
  viewStudents,
} from "../controllers/facultyController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { isFaculty } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Apply authenticate middleware first, then isFaculty middleware
router.post("/aat1", authenticate, isFaculty, createAAT1);
router.post("/aat2", authenticate, isFaculty, createAAT2);
router.post("/remedial-session", authenticate, isFaculty, createRemedialSession);
router.get("/students", authenticate, isFaculty, viewStudents);

export default router;