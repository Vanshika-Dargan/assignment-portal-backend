import express from "express";
import { register, login } from "../controller/auth-controller.js";
export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
