import { useState, useEffect } from "react";
import { useBranch } from "../../../CONTEXTS/BranchContext.tsx";
import { 
  addInventoryToBranchRequest,
  getEmployeesByBranchRequest 
} from "../../../api/branch.js";

const InventoryForm = () => {
  const { selectedBranch } = useBranch();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    employees: [],
    inventoryItems: [
      {
        category: "Pollo(kg)",
        details: {
          initialStock: 0,
          sales: 0,
          finalStock: 0
        }
      },
      {
        category: "Papas(kg)",
        details: {
          initialStock: 0,
          sales: 0,
          finalStock: 0
        }
      }
    ],
    observations: ""
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      // Verificar que selectedBranch tenga un valor y sea el correcto
      if (!selectedBranch) {
        console.log("No hay sucursal seleccionada");
        return;
      }

      // Obtener el nombre de la sucursal correctamente
      const branchName = typeof selectedBranch === 'string' 
        ? selectedBranch 
        : selectedBranch.nameBranch;

      if (!branchName) {
        console.log("Nombre de sucursal no disponible");
        return;
      }

      setIsLoading(true);
      try {
        const response = await getEmployeesByBranchRequest(branchName);
        if (response.data && response.data.employees) {
          setEmployees(response.data.employees);
        } else {
          console.log("No se encontraron empleados");
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error al obtener empleados:", error);
        setEmployees([]);
        alert("Error al cargar los empleados. Por favor, intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
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

  const handleInventoryChange = (category, field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      inventoryItems: prevForm.inventoryItems.map(item =>
        item.category === category
          ? {
              ...item,
              details: {
                ...item.details,
                [field]: Number(value)
              }
            }
          : item
      )
    }));
  };

  const validateInventory = () => {
    for (const item of form.inventoryItems) {
      const { initialStock, sales, finalStock } = item.details;
      
      if (initialStock < 0 || sales < 0 || finalStock < 0) {
        return "Los valores no pueden ser negativos";
      }
      
      if (finalStock > initialStock) {
        return "El stock final no puede ser mayor que el stock inicial";
      }
      
      if (sales > initialStock) {
        return "Las ventas no pueden ser mayores que el stock inicial";
      }
    }
    return null;
  };

  const resetForm = () => {
    setForm({
      employees: [],
      inventoryItems: [
        {
          category: "Pollo(kg)",
          details: {
            initialStock: 0,
            sales: 0,
            finalStock: 0
          }
        },
        {
          category: "Papas(kg)",
          details: {
            initialStock: 0,
            sales: 0,
            finalStock: 0
          }
        }
      ],
      observations: ""
    });
  };

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

    const invalidInventory = form.inventoryItems.some(
      item => 
        item.details.finalStock > item.details.initialStock || 
        item.details.sales > item.details.initialStock ||
        item.details.initialStock < 0 ||
        item.details.sales < 0 ||
        item.details.finalStock < 0
    );

    if (invalidInventory) {
      alert("Hay errores en los valores del inventario. Verifique que:\n- No haya valores negativos\n- El stock final no sea mayor al inicial\n- Las ventas no sean mayores al stock inicial");
      return;
    }

    try {
      setIsLoading(true);
      const inventoryData = {
        nameBranch: branchName,
        employees: form.employees,
        inventoryItems: form.inventoryItems,
        observations: form.observations
      };

      const response = await addInventoryToBranchRequest(inventoryData);
      
      if (response.data && response.data.success) {
        resetForm();
        alert("Inventario registrado exitosamente");
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
                Items de Inventario
              </h3>
              <div className="space-y-4">
                {form.inventoryItems.map((item) => (
                  <div key={item.category} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">{item.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Stock Inicial (kg)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={item.details.initialStock}
                          onChange={(e) =>
                            handleInventoryChange(item.category, "initialStock", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Ventas (kg)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={item.details.sales}
                          onChange={(e) =>
                            handleInventoryChange(item.category, "sales", e.target.value)
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
                          value={item.details.finalStock}
                          onChange={(e) =>
                            handleInventoryChange(item.category, "finalStock", e.target.value)
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