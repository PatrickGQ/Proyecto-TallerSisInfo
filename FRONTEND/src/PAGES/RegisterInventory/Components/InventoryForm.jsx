import { useState, useEffect } from "react";
import { useBranch } from "../../../CONTEXTS/BranchContext.tsx";
import { 
  addInventoryToBranchRequest,
  getEmployeesByBranchRequest,
  getIngredientsByBranchRequest 
} from "../../../api/branch.js";

const InventoryForm = () => {
  const { selectedBranch } = useBranch();
  const [employees, setEmployees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    employees: [],
    ingredients: [],
    observations: ""
  });

  useEffect(() => {
    const fetchData  = async () => {
      // Verificar que selectedBranch tenga un valor y sea el correcto
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

      setIsLoading(true);
      try {
        // Fetch both employees and ingredients in parallel
        const [employeesResponse, ingredientsResponse] = await Promise.all([
          getEmployeesByBranchRequest(branchName),
          getIngredientsByBranchRequest(branchName)
        ]);

        if (employeesResponse.data && employeesResponse.data.employees) {
          setEmployees(employeesResponse.data.employees);
        }

        if (ingredientsResponse.data && ingredientsResponse.data.ingredients) {
          setIngredients(ingredientsResponse.data.ingredients);
          // Initialize form with ingredients
          setForm(prev => ({
            ...prev,
            ingredients: ingredientsResponse.data.ingredients.map(ingredient => ({
              ingredientId: ingredient._id,
              name: ingredient.name,
              initialStock: 0,
              finalStock: 0,
              movements: []
            }))
          }));
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al cargar los datos. Por favor, intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBranch]);

  const handleEmployeeSelection = (employee) => {
    setForm(prevForm => {
      const isSelected = prevForm.employees.some(e => e.employeeCi === employee._id);
      
      if (isSelected) {
        return {
          ...prevForm,
          employees: prevForm.employees.filter(e => e.employeeCi !== employee._id)
        };
      } else {
        return {
          ...prevForm,
          employees: [...prevForm.employees, {
            employeeCi: employee._id,
            name: employee.name
          }]
        };
      }
    });
  };

  const handleInventoryChange = (ingredientId, field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      ingredients: prevForm.ingredients.map(item =>
        item.ingredientId === ingredientId
        ? { ...item, [field]: Number(value) }
        : item
      )
    }));
  };

  const validateInventory = () => {
    for (const item of form.ingredients) {
      if (item.initialStock < 0 || item.finalStock < 0) {
        return "Los valores no pueden ser negativos";
      }
      
      if (item.finalStock > item.initialStock) {
        return "El stock final no puede ser mayor que el stock inicial";
      }
    }
    return null;
  };

  const calculateMovements = (ingredient) => {
    const difference = ingredient.initialStock - ingredient.finalStock;
    if (difference > 0) {
      return [{
        type: 'sale',
        ingredientId: ingredient.ingredientId,
        ingredientName: ingredient.name,
        quantity: difference,
        unit: 'kg',
        reference: 'Venta diaria',
        date: new Date()
      }];
    }
    return [];
  };

  const validationError = validateInventory();
    if (validationError) {
      alert(validationError);
      return;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBranch) {
      alert("Por favor, seleccione una sucursal");
      return;
    }

    // Obtener el nombre de la sucursal correctamente
    const branchName = typeof selectedBranch === 'string' 
      ? selectedBranch 
      : selectedBranch.nameBranch;

    if (!branchName) {
      alert("Error con el nombre de la sucursal");
      return;
    }

    if (form.employees.length === 0) {
      alert("Por favor, seleccione al menos un empleado");
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare inventory data according to the model
      const inventoryData = {
        date: new Date(),
        ingredients: form.ingredients.map(ingredient => ({
          ingredientId: ingredient.ingredientId,
          name: ingredient.name,
          initialStock: ingredient.initialStock,
          finalStock: ingredient.finalStock,
          movements: calculateMovements(ingredient)
        })),
        employees: form.employees,
        observations: form.observations,
        status: 'open'
      };

      const response = await addInventoryToBranchRequest({
        nameBranch: branchName,
        ...inventoryData
      });
      
      if (response.data && response.data.success) {
        alert("Inventario registrado exitosamente");
        // Reset form but keep employees and ingredients list
        setForm(prev => ({
          ...prev,
          employees: [],
          ingredients: ingredients.map(ingredient => ({
            ingredientId: ingredient._id,
            name: ingredient.name,
            initialStock: 0,
            finalStock: 0,
            movements: []
          })),
          observations: ""
        }));
      } else {
        throw new Error(response.data?.message || "Error al registrar el inventario");
      }
    } catch (error) {
      console.error("Error al registrar inventario:", error);
      alert(error.response?.data?.message || "Error al registrar el inventario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Registro de Inventario - {typeof selectedBranch === 'string' ? selectedBranch : selectedBranch?.nameBranch}
        </h2>

        {isLoading ? (
          <div className="text-center py-4">
            <p>Cargando...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de Empleados */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Empleados Presentes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      form.employees.some(e => e.employeeCi === employee._id)
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

            {/* Inventario */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Inventario de Ingredientes
              </h3>
              <div className="space-y-4">
                {form.ingredients.map((ingredient) => (
                  <div key={ingredient.ingredientId} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">{ingredient.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Stock Inicial (kg)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={ingredient.initialStock}
                          onChange={(e) =>
                            handleInventoryChange(ingredient.ingredientId, "initialStock", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Stock Final (kg)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={ingredient.finalStock}
                          onChange={(e) =>
                            handleInventoryChange(ingredient.ingredientId, "finalStock", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Observaciones
              </label>
              <textarea
                value={form.observations}
                onChange={(e) => setForm(prev => ({ ...prev, observations: e.target.value }))}
                className="w-full p-2 border rounded-md h-24"
                placeholder="Ingrese cualquier observación relevante..."
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
              {isLoading ? 'Registrando...' : 'Registrar Inventario'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InventoryForm;