import Product from '../models/product.model.js';

export const registerProduct = async (req, res) => {
    const { name, price, id } = req.body;

    console.log(req.body)

    const newProduct = new Product({
        name,
        price,
        id
    });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
};