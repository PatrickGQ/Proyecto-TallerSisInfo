import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import connectToMongoDB from './db.js';
import branchsRouter from './routes/branch.routes.js';
import productsBranchRouter from './routes/product.branch.routes.js';
import salesBranchRouter from './routes/sale.branch.routes.js';
import employeeBranchRouter from './routes/employee.branch.routes.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import inventoryBranchRouter from './routes/inventory.branch.routes.js';
import ingredientBranchRouter from './routes/ingredient.branch.routes.js';


const app = express();

app.use(express.json());

app.use(cors({/*
    origin: (origin, callback) => {
        callback(null, origin); // Permite cualquier origen
    },*/
    origin: 'http://localhost:5173',
    credentials: true, // Access to credentials
}));

app.use(morgan('dev'));

connectToMongoDB();

app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

const PORT = 3000;
app.use('/api', authRouter);
app.use('/api/branches', branchsRouter);
app.use('/api/branch/products', productsBranchRouter);
app.use('/api/branch/sales', salesBranchRouter);
app.use('/api/branch/employees', employeeBranchRouter);
app.use('/api/branch/inventory', inventoryBranchRouter);

app.use('/api/branch/ingredients', ingredientBranchRouter);

app.listen(PORT, () => {
    console.log("Backend listen on port", PORT);
})