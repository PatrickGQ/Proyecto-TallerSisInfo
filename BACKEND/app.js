import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import connectToMongoDB from './db.js';
import productsRouter from './routes/product.routes.js';

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

const PORT = 3000;

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log("Backend listen on port", PORT);
})