import { Router } from "express";
import { getBranches, registerBranch } from "../controllers/branches.controller.js";

const branchsRouter = Router();

branchsRouter.post('/', registerBranch);
branchsRouter.get('/', getBranches);

export default branchsRouter;