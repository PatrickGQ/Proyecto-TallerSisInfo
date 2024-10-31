import { Router } from "express";
import { login, register, logout, verifyPassword } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verifyPassword', verifyPassword); // Si aún necesitas verificar contraseñas

export default authRouter;
