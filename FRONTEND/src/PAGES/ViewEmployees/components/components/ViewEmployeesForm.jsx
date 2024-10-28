import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../../../../CONTEXTS/BranchContext';
import { getEmployeesWithFiltersRequest } from '../../../../api/branch'; // Asegúrate de tener esta función en tu API

const ViewEmployeesForm = ({ activeFilters }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { selectedBranch } = useBranch(); // Extrae la sucursal seleccionada del contexto

  useEffect(() => {
    const fetchFilteredEmployees = async () => {
        try {
          console.log(selectedBranch);
          console.log(activeFilters);
          const response = await getEmployeesWithFiltersRequest(selectedBranch, activeFilters);
          console.log(response);
          setEmployees(response.data.employees);
        } catch (error) {
          console.error('Error al obtener los empleados con filtros:', error);
        }
      };

        fetchFilteredEmployees();
    }, [selectedBranch, activeFilters]);


  // Filtrar empleados en base a la búsqueda y los filtros
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee._id}
            className="flex flex-col border rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow duration-300"
            onClick={() => navigate(`/viewEmployee/${employee._id}`)}
          >
            <div className="p-4 flex flex-col items-center">
              {/* Foto del empleado */}
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
              
              {/* Información del empleado */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{employee.name}</h2>
              <p className="text-gray-600"><strong>CI:</strong> {employee.ci}</p>
              <p className="text-gray-600"><strong>Correo:</strong> {employee.email}</p>
              <p className="text-gray-600"><strong>Rol:</strong> {employee.role}</p>
              <p className="text-gray-600"><strong>Salario:</strong> {employee.salary} BS</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployeesForm;
