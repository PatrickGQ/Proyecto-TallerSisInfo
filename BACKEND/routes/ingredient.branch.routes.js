import { Router } from 'express';
import {
    registerIngredientToBranch,
    getIngredientsByBranch,
    updateIngredientInBranch,
    removeIngredientFromBranch
} from '../controllers/ingredient.branch.controller.js';

const ingredientBranchRouter = Router();

// Registrar un nuevo ingrediente en una sucursal
ingredientBranchRouter.post('/register', registerIngredientToBranch);

// Obtener todos los ingredientes de una sucursal
ingredientBranchRouter.get('/getIngredientsByBranch/:nameBranch', getIngredientsByBranch);

// Actualizar un ingrediente en una sucursal
ingredientBranchRouter.put('/updateIngredient/:id', updateIngredientInBranch);

// Eliminar un ingrediente de una sucursal
ingredientBranchRouter.delete('/removeIngredient', removeIngredientFromBranch);

export default ingredientBranchRouter;