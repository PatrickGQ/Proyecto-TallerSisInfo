import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../../../../CONTEXTS/BranchContext';
import { getEmployeesWithFiltersRequest, editEmployeeRequest, deleteEmployeeRequest } from '../../../../api/branch';

const ViewEmployeesForm = ({ activeFilters }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null); // Estado para el empleado que se está editando
  const navigate = useNavigate();
  const { selectedBranch } = useBranch();

  useEffect(() => {
    const fetchFilteredEmployees = async () => {
      try {
        const response = await getEmployeesWithFiltersRequest(selectedBranch, activeFilters);
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error al obtener los empleados con filtros:', error);
      }
    };

    fetchFilteredEmployees();
  }, [selectedBranch, activeFilters]);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    editEmployeeRequest(editEmployee._id, {
      name: editEmployee.name,
      salary: editEmployee.salary,
      email: editEmployee.email,
      role: editEmployee.role,
    })
    .then(response => {
      setEmployees(employees.map(emp => emp._id === editEmployee._id ? response.data.employee : emp));
      setIsEditing(false);
      setEditEmployee(null);
    })
    .catch(error => console.error('Error al editar el empleado:', error));
  };

  const handleDelete = (id) => {
    deleteEmployeeRequest(id)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== id));
      })
      .catch(error => console.error('Error al eliminar el empleado:', error));
  };

  const filteredEmployees = employees.filter(employee => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      employee.ci.toLowerCase().includes(lowerCaseSearchTerm) ||
      employee.email.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Carnets de Empleados</h1>
      <input
        type="text"
        placeholder="Buscar empleados por nombre, CI o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      {/* Tarjeta de edición de empleado */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Editar Empleado</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={editEmployee.name}
              onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Salario"
              value={editEmployee.salary}
              onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Correo"
              value={editEmployee.email}
              onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Rol"
              value={editEmployee.role}
              onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee._id}
            className="flex flex-col border rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                {employee.photo ? (
                  <img
                    src={`http://localhost:3000/uploads/${employee.photo}`}
                    alt={employee.name}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    Sin foto
                  </div>
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{employee.name}</h2>
              <p className="text-gray-600"><strong>CI:</strong> {employee.ci}</p>
              <p className="text-gray-600"><strong>Correo:</strong> {employee.email}</p>
              <p className="text-gray-600"><strong>Rol:</strong> {employee.role}</p>
              <p className="text-gray-600"><strong>Salario:</strong> {employee.salary} BS</p>
            </div>
            <div className="flex justify-between p-4">
              <button
                onClick={() => handleEdit(employee)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(employee._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployeesForm;
