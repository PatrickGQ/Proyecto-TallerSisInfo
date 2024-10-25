import { Router } from "express";
import upload from "../config/multer.config.js";
import { addProductToBranch, getProductsByBranch } from "../controllers/products.branch.controller.js";

const productsBranchRouter = Router();

productsBranchRouter.post('/addProduct', upload.single('image') , addProductToBranch);
productsBranchRouter.post('/getProducts', getProductsByBranch);

export default productsBranchRouter;