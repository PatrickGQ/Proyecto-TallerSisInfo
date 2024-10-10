import { Router } from 'express';
//import verifyJwT from "../middlewares/verifyJwt.middleware.js";
import { getSalesByDateDB, getSalesDB, getTodaySalesDB, registerSale } from '../controllers/sales.controller.js';

const salesRouter = Router();

// Ruta para registrar una venta
salesRouter.post('/registerSale', registerSale);

salesRouter.get('/', getSalesDB);

salesRouter.get('/today', getTodaySalesDB);

salesRouter.get('/:id', getSalesDB); 

salesRouter.get('/date/:date', getSalesByDateDB); // Nueva ruta para obtener ventas por fecha

export default salesRouter;