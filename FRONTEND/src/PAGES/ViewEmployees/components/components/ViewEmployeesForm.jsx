import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeesRequest } from '../../../../api/employee';

const ViewEmployeesForm = ({ activeFilters }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployeesRequest();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    // Filtro por búsqueda
    const matchesSearch = searchTerm ? (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : true;
  
    // Filtro por rango de salario
    const matchesSalary = activeFilters.salaryRange.min && activeFilters.salaryRange.max ? (
      employee.salary >= Number(activeFilters.salaryRange.min) &&
      employee.salary <= Number(activeFilters.salaryRange.max)
    ) : true;
  
    // Filtro por estado del contrato
    const today = new Date();
    const contractEnd = new Date(employee.contractEnd);
    const isContractActive = contractEnd >= today;
    const matchesContract = activeFilters.contractStatus === 'all' ? true :
      activeFilters.contractStatus === 'active' ? isContractActive : !isContractActive;
  
    // Filtro por rol
    const matchesRole = activeFilters.role === 'all' ? true :
      employee.role === activeFilters.role;
  
    return matchesSearch && matchesSalary && matchesContract && matchesRole;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Carnets de Empleados</h1>
      <input
        type="text"
        placeholder="Buscar empleados por nombre, CI o email..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-gray-200"
            onClick={() => navigate(`/viewEmployee/${employee._id}`)}
          >
            <div className="p-4">
              {/* Header with company info */}
              <div className="border-b pb-2 mb-3">
                <h3 className="text-lg font-bold text-center text-gray-800">IDENTIFICACIÓN DE EMPLEADO</h3>
                <p className="text-sm text-center text-gray-600">Restaurant Management System</p>
              </div>

              {/* Employee photo and basic info layout */}
              <div className="flex space-x-4">
                <div className="w-1/3">
                  {employee.photo ? (
                    <img
                      src={`http://localhost:3000/uploads/${employee.photo}}
                      alt={employee.name}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Sin foto</span>
                    </div>
                  )}
                </div>
                
                <div className="w-2/3">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">NOMBRE</p>
                      <p className="font-semibold">{employee.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CI</p>
                      <p className="font-semibold">{employee.ci}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROL</p>
                      <p className="font-semibold">{employee.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional details */}
              <div className="mt-4 space-y-2 border-t pt-2">
                <div>
                  <p className="text-xs text-gray-500">CORREO ELECTRÓNICO</p>
                  <p className="text-sm">{employee.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">TELÉFONO</p>
                  <p className="text-sm">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">FECHA DE CONTRATO</p>
                  <p className="text-sm">
                    {new Date(employee.contractEnd).toLocaleDateString('es-BO')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployeesForm;