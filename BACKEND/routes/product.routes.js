import { Router } from "express";

import { registerProduct } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.post('/', registerProduct);

export default productsRouter;