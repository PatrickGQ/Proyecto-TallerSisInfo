import { Router } from "express";
import upload from "../config/multer.config.js";
import { registerEmployee } from "../controllers/employees.controller.js";

const employeesRouter = Router();

// Asegúrate de que el campo sea 'photo' y no 'image' ya que en el formulario es 'photo'
employeesRouter.post('/', upload.single('photo'), registerEmployee);

export default employeesRouter;
