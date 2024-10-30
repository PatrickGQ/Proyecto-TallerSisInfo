import { Router } from 'express';
import { addSaleToBranch, getSalesByBranch, getTodaySalesByBranch, getSalesByDateDB} from '../controllers/sales.branch.controller.js';

const salesBranchRouter = Router();

// Ruta para registrar una venta
salesBranchRouter.post('/addSale', addSaleToBranch);

salesBranchRouter.post('/getSales', getSalesByBranch);

salesBranchRouter.post('/getTodaySales', getTodaySalesByBranch);

salesBranchRouter.post('/getByDate/:date', getSalesByDateDB);

export default salesBranchRouter;