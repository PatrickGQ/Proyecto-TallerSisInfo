import DailyInventory from '../models/inventory.model.js';

// Crear nuevo inventario diario
export const createDailyInventory = async (req, res) => {
    try {
        const { employees, inventoryItems, observations } = req.body;
        
        // Verificar si ya existe un inventario para hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const existingInventory = await DailyInventory.findOne({
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingInventory) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un inventario para el día de hoy'
            });
        }

        const newInventory = new DailyInventory({
            employees,
            inventoryItems,
            observations
        });

        const savedInventory = await newInventory.save();
        
        res.status(201).json({
            success: true,
            inventory: savedInventory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el inventario',
            error: error.message
        });
    }
};

// Obtener todos los inventarios
export const getDailyInventories = async (req, res) => {
    try {
        const inventories = await DailyInventory.find()
            .sort({ date: -1 });
        
        res.json({
            success: true,
            inventories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los inventarios',
            error: error.message
        });
    }
};

// Obtener inventario por fecha
export const getDailyInventoryByDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        date.setHours(0, 0, 0, 0);
        
        const inventory = await DailyInventory.findOne({
            date: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró inventario para la fecha especificada'
            });
        }

        res.json({
            success: true,
            inventory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el inventario',
            error: error.message
        });
    }
};

// Obtener inventario del día actual
export const getCurrentDayInventory = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const inventory = await DailyInventory.findOne({
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'No se ha registrado inventario para hoy'
            });
        }

        res.json({
            success: true,
            inventory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el inventario del día',
            error: error.message
        });
    }
};

// Actualizar inventario
export const updateDailyInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedInventory = await DailyInventory.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventario no encontrado'
            });
        }

        res.json({
            success: true,
            inventory: updatedInventory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el inventario',
            error: error.message
        });
    }
};

// Obtener estadísticas de inventario
export const getInventoryStats = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const stats = await DailyInventory.aggregate([
            {
                $match: {
                    date: { $gte: lastWeek }
                }
            },
            {
                $unwind: '$inventoryItems'
            },
            {
                $group: {
                    _id: '$inventoryItems.category',
                    avgInitialStock: { $avg: '$inventoryItems.details.initialStock' },
                    avgFinalStock: { $avg: '$inventoryItems.details.finalStock' },
                    totalSales: { $sum: '$inventoryItems.details.sales' },
                    daysTracked: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las estadísticas',
            error: error.message
        });
    }
};