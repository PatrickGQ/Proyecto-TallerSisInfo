import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';

export const registerSale = async (req, res) => {
    const {
        clientName,
        clientCI,
        paymentMethod,
        discount,
        saleDate,
        products,
        total
    } = req.body;

    if (!clientName || !clientCI || !paymentMethod || !products || !total) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios en la solicitud'
        });
    }

    let parsedProducts;
    try {
        parsedProducts = typeof products === 'string' ? JSON.parse(products) : products;
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Formato de datos de productos inválido'
        });
    }

    if (!Array.isArray(parsedProducts)) {
        return res.status(400).json({
            success: false,
            message: 'Los productos deben ser un arreglo'
        });
    }

    try {
        const productsWithDetails = await Promise.all(
            parsedProducts.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Producto con ID ${item.productId} no encontrado`);
                }
                return {
                    productId: product._id,
                    name: product.name,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity)
                };
            })
        );

        const newSale = new Sale({
            clientName,
            clientCI,
            products: productsWithDetails,
            discount: parseFloat(discount || 0),
            totalAmount: parseFloat(total),
            paymentMethod,
            saleDate: saleDate ? new Date(saleDate) : new Date()
        });

        const savedSale = await newSale.save();
        res.status(201).json({
            success: true,
            message: 'Venta registrada exitosamente',
            sale: savedSale
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar la venta',
            error: error.message
        });
    }
};