import express from "express";
const router = express.Router();

// Autherization
import { protectRoute } from "../middlewares/authentication.js";

// Controllers
import {
  userRegister,
  authUser,
  deposit,
  withdraw,
  getProfile,
} from "../controllers/userControllers.js";

router.post("/register", userRegister);

router.post("/login", authUser);

router.put("/deposit", deposit);

router.put("/withdraw", withdraw);

router.get("/profile/:id", getProfile);

export default router;
