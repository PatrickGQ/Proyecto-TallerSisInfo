import { Router } from "express";
import { getBranches, registerBranch, deleteBranch, editBranch, addImageToBranches, getBranchImages, addTextToBranches, getBranchTexts } from "../controllers/branches.controller.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

export const uploadImage = upload.single('image');


const branchsRouter = Router();

branchsRouter.post('/', registerBranch);
branchsRouter.get('/', getBranches);
branchsRouter.delete('/:id', deleteBranch); // Eliminar sucursal por ID
branchsRouter.put('/:id', editBranch); 
branchsRouter.patch('/add-image', uploadImage, addImageToBranches);
branchsRouter.patch('/branch-text', addTextToBranches);
branchsRouter.get('/:id/images', getBranchImages);
branchsRouter.get('/:id/texts', getBranchTexts);


export default branchsRouter;

