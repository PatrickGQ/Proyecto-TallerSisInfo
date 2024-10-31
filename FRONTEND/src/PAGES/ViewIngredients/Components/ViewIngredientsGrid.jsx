import { useState, useEffect } from 'react';
import { useBranch } from '../../../CONTEXTS/BranchContext';
import { getIngredientsByBranchRequest } from '../../../api/branch';
import { FaCubes } from 'react-icons/fa';

const ViewIngredientsGrid = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedBranch } = useBranch();

  useEffect(() => {
    const fetchIngredients = async () => {
      if (!selectedBranch) {
        console.log("No hay sucursal seleccionada");
        return;
      }

      const branchName = typeof selectedBranch === 'string' 
        ? selectedBranch 
        : selectedBranch.nameBranch;

      if (!branchName) {
        console.log("Nombre de sucursal no disponible");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getIngredientsByBranchRequest(branchName);
        setIngredients(response.data.ingredients);
      } catch (error) {
        console.error("Error al obtener los ingredientes:", error);
        alert("Error al cargar los ingredientes. Por favor, intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, [selectedBranch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Cargando ingredientes...</p>
      </div>
    );
  }

  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaCubes className="text-6xl text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No hay ingredientes registrados</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Insumos Registrados</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div className="flex flex-col items-center">
              {/* Ícono del ingrediente */}
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
                <FaCubes className="text-3xl text-red-600" />
              </div>
              
              {/* Información del ingrediente */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {ingredient.name}
              </h2>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Stock Actual:</span>
                  <span className="font-medium">
                    {ingredient.currentStock} {ingredient.unit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Costo por {ingredient.unit}:</span>
                  <span className="font-medium">{ingredient.cost} BS</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unidad de Medida:</span>
                  <span className="font-medium">{ingredient.unit}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIngredientsGrid;