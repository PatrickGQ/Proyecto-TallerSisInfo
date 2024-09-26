import Product from '../models/product.model.js';

export const registerProduct = async (req, res) => {
    const { name, price, id, description } = req.body;
    const image = req.file ? req.file.path : null;
    
    console.log('Archivo subido:', req.file); // Esto debería mostrar detalles del archivo si se envió correctamente
    console.log('Datos del cuerpo:', req.body);

    const newProduct = new Product({
        name,
        price,
        id,
        image, 
        description
    });

    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
};