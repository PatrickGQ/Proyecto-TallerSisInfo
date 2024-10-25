import Branch from '../models/branch.model.js';

export const registerBranch = async (req, res) => {
    try {
        const { nameBranch, address, phone } = req.body;

        // Verificar si ya existe una sucursal con el mismo nombre o teléfono
        const existingBranch = await Branch.findOne({
            $or: [{ nameBranch }, { phone }]
        });

        if (existingBranch) {
            return res.status(400).json({
                success: false,
                message: 'El nombre o el número de teléfono ya están registrados para otra sucursal.'
            });
        }

        // Si no hay conflictos, crear la nueva sucursal
        const newBranchToCreate = new Branch({
            nameBranch,
            address,
            phone
        });

        const newBranchCreated = await newBranchToCreate.save();

        // Respuesta exitosa con los datos de la nueva sucursal
        res.status(201).json({
            success: true,
            message: 'Sucursal creada exitosamente',
            branch: newBranchCreated
        });

    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            success: false,
            message: 'Error al crear sucursal',
            error: error.message
        });
    }
};

export const getBranches = async (req, res) => {
    try {
        const branchs = await Branch.find();
        res.json(branchs);
    } catch (error) {
        console.log("Error obteniendo branchs: ", error);
        res.status(500).json({ success: false, message: 'Error obteniendo obteniendo branchs', error });
    }
};

