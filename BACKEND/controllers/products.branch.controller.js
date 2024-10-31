import Branch from '../models/branch.model.js';
import Product from '../models/product.model.js';

export const addProductToBranch = async (req, res) => {
    try {
        const { nameBranch, nameProduct, price, id, description } = req.body;
        console.log(nameBranch, nameProduct, price, id, description)
        const image = req.file ? req.file.filename : null;

        const branch = await Branch.findOne({ nameBranch: nameBranch.toLowerCase() });

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: 'Ya existe un producto con ese ID' });
        }

        const newProduct = new Product({
            nameProduct,
            price,
            id,
            image,
            description
        });

        const savedProduct = await newProduct.save();

        branch.products.push(savedProduct._id);
        await branch.save();

        res.status(200).json({
            success: true,
            message: `Producto agregado exitosamente a la sucursal ${branch.nameBranch}`,
            branch,
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar producto a la sucursal',
            error: error.message
        });
    }
};

export const getProductsByBranch = async (req, res) => {
    try {
        const { nameBranch } = req.body;
        console.log(nameBranch);
        const branch = await Branch.findOne({ nameBranch: nameBranch.toLowerCase() })
            .populate('products'); 

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: 'Productos obtenidos exitosamente',
            products: branch.products // Aquí están todos los productos de la sucursal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos de la sucursal',
            error: error.message
        });
    }
};

export const updateProductRecipe = async (req, res) => {
    try {
        const { productId } = req.params;
        const { recipe } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { recipe },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Receta actualizada exitosamente',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la receta',
            error: error.message
        });
    }
};