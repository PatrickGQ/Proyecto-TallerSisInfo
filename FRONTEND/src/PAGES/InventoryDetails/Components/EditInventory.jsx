import { useState } from 'react';
import { updateBranchInventoryRequest } from '../../../api/branch';

const EditInventory = ({ inventory, onSave, onCancel }) => {
  const [editedInventory, setEditedInventory] = useState(inventory);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateBranchInventoryRequest(inventory._id, editedInventory);
      onSave(editedInventory);
    } catch (error) {
      console.error('Error al actualizar el inventario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Implementar el formulario de edición aquí
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      {/* Implementar campos de edición */}
    </form>
  );
};

export default EditInventory;