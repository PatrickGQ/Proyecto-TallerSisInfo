import Branch from "../models/branch.model.js";

export const registerBranch = async (req, res) => {
  try {
    const { nameBranch, address, phone } = req.body;

    // Verificar si ya existe una sucursal con el mismo nombre o teléfono
    const existingBranch = await Branch.findOne({
      $or: [{ nameBranch }, { phone }],
    });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre o el número de teléfono ya están registrados para otra sucursal.",
      });
    }

    // Si no hay conflictos, crear la nueva sucursal
    const newBranchToCreate = new Branch({
      nameBranch,
      address,
      phone,
    });

    const newBranchCreated = await newBranchToCreate.save();

    // Respuesta exitosa con los datos de la nueva sucursal
    res.status(201).json({
      success: true,
      message: "Sucursal creada exitosamente",
      branch: newBranchCreated,
    });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      success: false,
      message: "Error al crear sucursal",
      error: error.message,
    });
  }
};

export const getBranches = async (req, res) => {
  try {
    const branchs = await Branch.find();
    res.status(200).json(branchs);
  } catch (error) {
    console.log("Error obteniendo branchs: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error obteniendo obteniendo branchs",
        error,
      });
  }
};

export const deleteBranch = async (req, res) => {
  console.log("hola")
  try {
    const { id } = req.params; 

    console.log(id);

    const deletedBranch = await Branch.findByIdAndDelete(id);

    if (!deletedBranch) {
      return res.status(404).json({
        success: false,
        message: "Sucursal no encontrada.",
      });
    }

    // Responder con el éxito de la eliminación
    res.status(200).json({
      success: true,
      message: "Sucursal eliminada exitosamente.",
      branch: deletedBranch,
    });
  } catch (error) {
    console.log("Error al eliminar la sucursal:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar la sucursal.",
      error: error.message,
    });
  }
};

export const editBranch = async (req, res) => {
  try {
    const { id } = req.params; // Recibir el ID de la sucursal desde los parámetros de la URL
    const { nameBranch, address, phone } = req.body; // Recibir los nuevos datos para actualizar la sucursal

    // Verificar si existe una sucursal con el mismo nombre o teléfono (para no repetir)
    const existingBranch = await Branch.findOne({
      $or: [{ nameBranch }, { phone }],
      _id: { $ne: id }, // Asegurarse de que no sea la misma sucursal
    });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre o el número de teléfono ya están registrados para otra sucursal.",
      });
    }

    // Actualizar la sucursal con los nuevos datos
    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      {
        nameBranch,
        address,
        phone,
        updatedAt: Date.now(), // Actualizamos la fecha de modificación
      },
      { new: true }
    ); // Devolvemos el documento actualizado

    if (!updatedBranch) {
      return res.status(404).json({
        success: false,
        message: "Sucursal no encontrada.",
      });
    }

    // Responder con los datos de la sucursal actualizada
    res.status(200).json({
      success: true,
      message: "Sucursal actualizada exitosamente.",
      branch: updatedBranch,
    });
  } catch (error) {
    console.log("Error al editar la sucursal:", error);
    res.status(500).json({
      success: false,
      message: "Error al editar la sucursal.",
      error: error.message,
    });
  }
};
