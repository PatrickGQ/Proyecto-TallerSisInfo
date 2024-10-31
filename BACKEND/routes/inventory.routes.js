import { Router } from 'express';
import { 
    createDailyInventory,
    getDailyInventories,
    getDailyInventoryByDate,
    updateDailyInventory,
    getInventoryStats,
    getCurrentDayInventory
} from '../controllers/inventory.controller.js';

const inventoryRouter = Router();

inventoryRouter.post('/daily', createDailyInventory);
inventoryRouter.get('/daily', getDailyInventories);
inventoryRouter.get('/daily/current', getCurrentDayInventory);
inventoryRouter.get('/daily/:date', getDailyInventoryByDate);
inventoryRouter.put('/daily/:id', updateDailyInventory);
inventoryRouter.get('/stats', getInventoryStats);

export default inventoryRouter;