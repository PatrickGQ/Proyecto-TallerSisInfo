import { Router } from "express";
import { login, register, logout, verifyPassword, verifyToken, updateUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.put('/update', updateUser);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verifyPassword', verifyPassword); // Si aún necesitas verificar contraseñas
authRouter.get('/verify', verifyToken); // Agrega esta línea para verificar el token
export default authRouter;
