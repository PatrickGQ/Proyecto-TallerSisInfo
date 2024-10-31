import { Router } from 'express';
import { 
    addInventoryToBranch,
    getDailyInventoryByBranch,
    getCurrentDayInventoryByBranch,
    getInventoryByDateAndBranch,
    updateBranchInventory,
    getInventoryStatsByBranch
} from '../controllers/inventory.branch.controller.js';

const inventoryBranchRouter = Router();

// POST - Crear nuevo inventario
inventoryBranchRouter.post('/addInventory', addInventoryToBranch);

// GET - Obtener inventarios
inventoryBranchRouter.get('/branch/:nameBranch', getDailyInventoryByBranch);
inventoryBranchRouter.get('/current/:nameBranch', getCurrentDayInventoryByBranch);
inventoryBranchRouter.get('/date/:nameBranch/:date', getInventoryByDateAndBranch);
inventoryBranchRouter.get('/stats/:nameBranch', getInventoryStatsByBranch);

// PUT - Actualizar inventario
inventoryBranchRouter.put('/update/:id', updateBranchInventory);

export default inventoryBranchRouter;