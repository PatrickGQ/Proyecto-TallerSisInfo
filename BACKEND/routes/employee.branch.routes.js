// routes/employee.branch.routes.js
import express from 'express';
import { 
    registerEmployeeToBranch,
    getEmployeesByBranch,
    getEmployeeById,
    getEmployeesWithFilters
} from '../controllers/employees.branch.controller.js';
import upload from '../config/multer.config.js';

const employeeBranchRouter = express.Router();

// Ruta para registrar un empleado en una sucursal
employeeBranchRouter.post('/addEmployee', upload.single('photo'), registerEmployeeToBranch);

// Ruta para obtener empleados en una sucursal específica
employeeBranchRouter.get('/getEmployeesByBranch/:branchName', getEmployeesByBranch);

// Ruta para obtener un empleado por ID
employeeBranchRouter.get('/getEmployeeById/:id', getEmployeeById);

// Ruta para obtener empleados con filtros
employeeBranchRouter.get('/getEmployeesWithFilters', getEmployeesWithFilters);

export default employeeBranchRouter;
