import { Router } from "express";
import upload from "../config/multer.config.js";
import { registerEmployee } from "../controllers/employees.controller.js";

const employeesRouter = Router();

employeesRouter.post('/', upload.single('image') , registerEmployee);


export default employeesRouter;