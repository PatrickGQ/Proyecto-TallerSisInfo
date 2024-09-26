import { Router } from "express";
import { registerSale } from "../controllers/sales.controller.js";

const salesRouter = Router();

// Ruta para registrar una venta
salesRouter.post('/', registerSale);

export default salesRouter;
