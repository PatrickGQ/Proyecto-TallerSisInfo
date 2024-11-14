import { Router } from "express";
import { getBranches, registerBranch, deleteBranch, editBranch } from "../controllers/branches.controller.js";

const branchsRouter = Router();

branchsRouter.post('/', registerBranch);
branchsRouter.get('/', getBranches);
branchsRouter.delete('/:id', deleteBranch); // Eliminar sucursal por ID
branchsRouter.put('/:id', editBranch); // Editar sucursal por ID

export default branchsRouter;

