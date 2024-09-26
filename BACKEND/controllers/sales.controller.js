import Sale from '../models/sale.model.js';

// Registrar una nueva venta
export const registerSale = async (req, res) => {
    const { ticket, client, ci, products, totalAmount } = req.body;

    const newSale = new Sale({
        ticket,
        client,
        ci,
        products,
        totalAmount
    });

    try {
        const savedSale = await newSale.save();
        res.json(savedSale);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
