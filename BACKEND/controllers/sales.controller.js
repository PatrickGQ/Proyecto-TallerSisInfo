import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';

export const registerSale = async (req, res) => {
    try {
        const {
            clientName,
            clientCI,
            paymentMethod,
            discount,
            saleDate,
            products,
            total
        } = req.body;

        let parsedProducts;
        try {
            parsedProducts = typeof products === 'string' ? JSON.parse(products) : products;
        } catch (error) {
            throw new Error('Invalid products data format');
        }

        if (!Array.isArray(parsedProducts)) {
            throw new Error('Products must be an array');
        }

        const productsWithDetails = await Promise.all(
            parsedProducts.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
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
            message: "Error al registrar la venta",
            error: error.message
        });
    }
};