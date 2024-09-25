import { Router } from "express";
import { registerProduct } from "../controllers/products.controller.js";
import upload from "../config/multer.config.js";

const productsRouter = Router();

productsRouter.post('/', upload.single('image') , registerProduct);

export default productsRouter;