import Product from '../models/product.model.js';
import { DailyInventory } from '../models/inventory.model.js';
import Branch from '../models/branch.model.js';

async function calculateIngredientUsage(products) {
    let ingredientUsage = {};

    for (const product of products) {
        const productDetails = await Product.findById(product.productId);
        if (!productDetails?.recipe) continue;

        for (const ingredient of productDetails.recipe) {
            const totalUsage = ingredient.amount * product.quantity;
            
            if (!ingredientUsage[ingredient.ingredientId]) {
                ingredientUsage[ingredient.ingredientId] = {
                    ingredientId: ingredient.ingredientId,
                    name: ingredient.name,
                    quantity: 0,
                    unit: ingredient.unit
                };
            }
            ingredientUsage[ingredient.ingredientId].quantity += totalUsage;
        }
    }

    return Object.values(ingredientUsage);
}

export const processSaleInventory = async function(req, res, next) {
    try {
        const { nameBranch } = req.body;
        const branch = await Branch.findOne({ nameBranch: nameBranch.toLowerCase() })
            .populate('inventories');

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Sucursal no encontrada'
            });
        }

        // Obtener el inventario activo del día
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dailyInventory = await DailyInventory.findOne({
            _id: { $in: branch.inventories },
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            },
            status: 'open'
        });

        if (!dailyInventory) {
            return res.status(400).json({
                success: false,
                message: 'No hay un inventario abierto para el día de hoy'
            });
        }

        const ingredientUsage = await calculateIngredientUsage(req.body.products);

        // Registrar movimientos de inventario
        for (const usage of ingredientUsage) {
            let ingredientRecord = dailyInventory.ingredients.find(
                i => i.ingredientId.toString() === usage.ingredientId.toString()
            );

            if (!ingredientRecord) {
                return res.status(400).json({
                    success: false,
                    message: `Ingrediente ${usage.name} no encontrado en el inventario`
                });
            }

            const movement = {
                type: 'sale',
                ingredientId: usage.ingredientId,
                ingredientName: usage.name,
                quantity: -usage.quantity,
                unit: usage.unit,
                reference: `TK-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            };

            ingredientRecord.movements.push(movement);
            ingredientRecord.finalStock = ingredientRecord.initialStock + 
                ingredientRecord.movements.reduce((sum, mov) => sum + mov.quantity, 0);

            if (ingredientRecord.finalStock < 0) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente de ${usage.name}`
                });
            }
        }

        await dailyInventory.save();
        req.dailyInventory = dailyInventory;
        next();
    } catch (error) {
        next(error);
    }
};