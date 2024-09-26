import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectToMongoDB from './db.js';
import productsRouter from './routes/product.routes.js';
import salesRouter from './routes/sale.routes.js'; // Importar las rutas de ventas

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Access to credentials
}));

app.use(morgan('dev'));

connectToMongoDB();

const PORT = 3000;

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para ventas
app.use('/api/sales', salesRouter); // Agregar las rutas para ventas

app.listen(PORT, () => {
    console.log("Backend listen on port", PORT);
});
