import { Router } from 'express';
import { addSaleToBranch, getSalesByBranch, getTodaySalesByBranch, getSalesByDateDB, getWeeklyProfitsByBranch} from '../controllers/sales.branch.controller.js';
import { processSaleInventory } from '../middlewares/sales.middleware.js';

const salesBranchRouter = Router();

// Ruta para registrar una venta
salesBranchRouter.post('/addSale', processSaleInventory, addSaleToBranch);

salesBranchRouter.post('/getSales', getSalesByBranch);

salesBranchRouter.post('/getTodaySales', getTodaySalesByBranch);

salesBranchRouter.get('/getByDate/:date/:nameBranch', getSalesByDateDB);

salesBranchRouter.get('/weeklyProfits/:nameBranch', getWeeklyProfitsByBranch);

export default salesBranchRouter;