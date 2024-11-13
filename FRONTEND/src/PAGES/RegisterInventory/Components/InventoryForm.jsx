import { useState, useEffect } from "react";
import { useBranch } from "../../../CONTEXTS/BranchContext.tsx";
import { 
  addInventoryToBranchRequest,
  getEmployeesByBranchRequest,
  getIngredientsByBranchRequest 
} from "../../../api/branch.js";

const AutomatedInventoryForm = () => {
  const { selectedBranch } = useBranch();
  const [employees, setEmployees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (selectedBranch) {
      loadInitialData();
    }
  }, [selectedBranch]);

  const loadInitialData = async () => {
    const branchName = typeof selectedBranch === 'string' 
      ? selectedBranch 
      : selectedBranch.nameBranch;

    if (!branchName) return;

    setIsLoading(true);
    try {
      // Cargar empleados e ingredientes
      const [employeesResponse, ingredientsResponse] = await Promise.all([
        getEmployeesByBranchRequest(branchName),
        getIngredientsByBranchRequest(branchName)
      ]);

      if (employeesResponse.data?.employees) {
        setEmployees(employeesResponse.data.employees);
      }

      if (ingredientsResponse.data?.ingredients) {
        setIngredients(ingredientsResponse.data.ingredients);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar los datos. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployees(prev => {
      const isSelected = prev.some(e => e.employeeCi === employee._id);
      
      if (isSelected) {
        return prev.filter(e => e.employeeCi !== employee._id);
      } else {
        return [...prev, {
          employeeCi: employee._id,
          name: employee.name
        }];
      }
    });
  };

  const handleStartInventory = async () => {
    if (selectedEmployees.length === 0) {
      alert("Por favor, seleccione al menos un empleado");
      return;
    }

    const branchName = typeof selectedBranch === 'string' 
      ? selectedBranch 
      : selectedBranch.nameBranch;

    if (!branchName) {
      alert("Error con el nombre de la sucursal");
      return;
    }

    try {
      setIsLoading(true);
      
      // Mapeo corregido según el modelo del backend
      const inventoryData = {
        nameBranch: branchName,
        employees: selectedEmployees,
        ingredients: ingredients.map(ingredient => ({
          ingredientId: ingredient._id,
          name: ingredient.name,
          initialStock: ingredient.currentStock, // Corregido: usando currentStock
          finalStock: ingredient.currentStock,   // Corregido: igual al initialStock
          movements: []
        })),
        observations: "Inventario inicial del día"
      };

      const response = await addInventoryToBranchRequest(inventoryData);
      
      if (response.data && response.data.success) {
        alert("Inventario iniciado exitosamente");
        setSelectedEmployees([]);
      } else {
        throw new Error(response.data?.message || "Error al iniciar el inventario");
      }
    } catch (error) {
      console.error("Error al iniciar inventario:", error);
      alert(error.response?.data?.message || "Error al iniciar el inventario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Iniciar Inventario - {typeof selectedBranch === 'string' ? selectedBranch : selectedBranch?.nameBranch}
        </h2>

        {isLoading ? (
          <div className="text-center py-4">
            <p>Cargando...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Seleccionar Empleados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedEmployees.some(e => e.employeeCi === employee._id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handleEmployeeSelection(employee)}
                  >
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm">{employee.ci}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartInventory}
              disabled={isLoading || selectedEmployees.length === 0}
              className={`w-full py-2 px-4 rounded-md text-white transition-colors duration-200 
                ${isLoading || selectedEmployees.length === 0
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              Iniciar Inventario del Día
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedInventoryForm;