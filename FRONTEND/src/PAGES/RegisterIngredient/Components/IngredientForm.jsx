import { useState } from 'react';
import { useBranch } from '../../../CONTEXTS/BranchContext.tsx';
import { registerIngredientToBranchRequest } from '../../../api/branch.js';

const IngredientForm = () => {
  const { selectedBranch } = useBranch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    unit: 'kg',
    currentStock: 0,
    cost: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBranch) {
      alert("Por favor, seleccione una sucursal");
      return;
    }

    const branchName = typeof selectedBranch === 'string' 
      ? selectedBranch 
      : selectedBranch.nameBranch;

    if (!branchName) {
      alert("Error con el nombre de la sucursal");
      return;
    }

    if (!form.name.trim()) {
      alert("Por favor, ingrese el nombre del ingrediente");
      return;
    }

    if (form.currentStock < 0 || form.cost < 0) {
      alert("Los valores no pueden ser negativos");
      return;
    }

    try {
      setIsLoading(true);
      const ingredientData = {
        nameBranch: branchName,
        ...form
      };

      const response = await registerIngredientToBranchRequest(ingredientData);
      
      if (response.data && response.data.success) {
        resetForm();
        alert("Ingrediente registrado exitosamente");
      } else {
        throw new Error(response.data?.message || "Error al registrar el ingrediente");
      }
    } catch (error) {
      console.error("Error al registrar ingrediente:", error);
      alert(error.response?.data?.message || "Error al registrar el ingrediente");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      unit: 'kg',
      currentStock: 0,
      cost: 0
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Registro de Ingrediente - {typeof selectedBranch === 'string' ? selectedBranch : selectedBranch?.nameBranch}
        </h2>

        {isLoading ? (
          <div className="text-center py-4">
            <p>Cargando...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre del Ingrediente */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nombre del Ingrediente
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-md"
                placeholder="Ej: Pollo, Papas, Tomate..."
              />
            </div>

            {/* Unidad de Medida */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Unidad de Medida
              </label>
              <select
                value={form.unit}
                onChange={(e) => setForm(prev => ({ ...prev, unit: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="kg">Kilogramos (kg)</option>
                <option value="g">Gramos (g)</option>
                <option value="l">Litros (l)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="unidad">Unidad</option>
              </select>
            </div>

            {/* Stock Actual */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stock Actual
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.currentStock}
                onChange={(e) => setForm(prev => ({ ...prev, currentStock: Number(e.target.value) }))}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Costo */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Costo por {form.unit}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.cost}
                onChange={(e) => setForm(prev => ({ ...prev, cost: Number(e.target.value) }))}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white transition-colors duration-200 
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {isLoading ? 'Registrando...' : 'Registrar Ingrediente'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default IngredientForm;