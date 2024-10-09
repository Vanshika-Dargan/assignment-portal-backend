import express from "express";
import { register, login } from "../../../shared/auth/authController.js";

export const adminRoutes = express.Router();

adminRoutes.post("/register", register);
adminRoutes.post("/login", login);

