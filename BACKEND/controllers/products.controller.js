import Product from '../models/product.model.js';

export const registerProduct = async (req, res) => {
    const { name } = req.body;

    console.log(req.body)

    const newProduct = new Product({
        name
    });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
};