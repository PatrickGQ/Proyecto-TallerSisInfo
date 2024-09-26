import Sale from '../models/sale.model.js';
import Product from  '../models/product.model.js';

// TODO: Assign  status codes

export const getSalesDB = async (req, res) => {
    try {
        const sales = await Sale.find();

        res.json(sales);
        
    } catch (error) {
        res.json(error);
    }
};

export const getTodaySalesDB = async (req, res) => {
    try {
        const now = new Date();

        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        const todaySales = await Sale.find({
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        res.json(todaySales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las ventas del día de hoy." });
    }
};

export const getSaleDB = async (req, res) => {
    const idSale = req.params.id;

   try{
    const saleFound = await Sale.findById(idSale);

    if(!saleFound) return res.json({message: "Sale not found"});

    res.json(saleFound);
   } catch (error) {
    res.json(error);
   }
};

export const addSaleDB = async (req, res) => {
    const saleData = req.body;
    try{
         // Crear una nueva instancia del modelo Sale con los datos recibidos
        const newSale = new Sale({
            ticket: saleData.ticket,
            client: saleData.client,
            ci: saleData.ci,
            products: saleData.products,
            totalAmount: saleData.totalAmount,
            date: saleData.date // Utilizar la misma fecha recibida desde addSaleReturnData
        });
        
        // TODO: FIX BUG {}, check quantity (INT NUMBER)
        await Promise.all(newSale.products.map(async productSaleed => {
            console.log(productSaleed._id);
            const foundProduct = await Product.findById(productSaleed.id);
            if (!foundProduct){ 
                const error = new Error(`Producto ${productSaleed.name} no encontrado`);
                error.productName = productSaleed.name,
                error.notFound = true;
                throw error;
            }
        }));

        // Guardar la nueva orden en la base de datos
        const savedSale = await newSale.save();

        res.status(201).json({
            success: true,
            message: 'Venta confirmada exitosamente',
            sale: savedSale
        });
        
    } catch(e) {
        console.log(e.message);
        if (e.notFound) {
            return res.status(404).json({
                message: `Error! El producto ${e.productName} ha sido borrado, consulte la página de productos`
            });
        }
        
        return res.status(500).json({ message: e.message });
    }   
};


export const updateSaleDB = async (req, res) => {
    const newSale = req.body;
    const newProductsToOrder = newSale.products.map(product => product);
    const oldSaleId = req.params.id;

    try {
        // TODO: FIX BUG {}, check quantity (INT NUMBER)
        const productsFound = await Promise.all(newProductsToOrder.map(async productOrdered => {
            const foundProduct = await Product.findById(productOrdered._id);
            
            if (!foundProduct) {
                const error = new Error(`Producto ${productOrdered.name} no encontrado`);
                error.productName = productOrdered.name,
                error.notFound = true;
                throw error;
            }
            console.log({
                id: foundProduct._id,
                name: foundProduct.name,
                price: foundProduct.price,
                quantity: productOrdered.quantity
            })
            return {
                id: foundProduct._id,
                name: foundProduct.name,
                price: foundProduct.price,
                quantity: productSaleed.quantity
            }
        }));

        const totalAmount = productsFound.reduce((total, product) => total + product.price * product.quantity, 0);

        const newSaleToUpdate = ({
            client: newSale.client,
            ci: newSale.ci,
            products: productsFound.map(p => ({
                _id: p._id,
                name: p.name,
                price: p.price,
                quantity: p.quantity
            })),
            totalAmount
        })

        const saleUpdated = await Sale.findByIdAndUpdate(oldSaleId, newSaleToUpdate,{
            new: true
        });

        res.status(200).json({message: "saleUpdated", saleUpdated});

    } catch(e) {
        if (e.notFound) {
            return res.status(404).json({
                message: `Error! El producto ${e.productName} ha sido borrado, consulte la página de productos`
            });
        }
        return res.status(500).json({ message: e.message });
    }
};

export const deleteSaleDB = async (req, res) => {
    const saleToDeleteId = req.params.id;
    try {
        const saleDeleted = await Sale.findByIdAndDelete(saleToDeleteId);

        if(!saleDeleted) return res.json({message: "Sale not found"});

        res.json({message: `Sale ${saleDeleted._id} deleted`, 
        saleDeleted});
        
    } catch (error) {
        res.json(error);
    }
};