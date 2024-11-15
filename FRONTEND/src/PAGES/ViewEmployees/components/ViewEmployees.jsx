import { useState } from "react";
import EmployeesFilterPanel from "./components/EmployeesFilterPanel";
import ViewEmployeesForm from "./components/ViewEmployeesForm";

const ViewEmployees = () => {
  const [form, setForm] = useState({});
  const [activeFilters, setActiveFilters] = useState({
    salaryRange: { min: '', max: '' },
    contractStatus: 'all',
    role: 'all'
  });

  const handleFormChange = (updatedForm) => {
    setForm(updatedForm);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4">
      {/* Panel de Filtros (en pantallas pequeñas ocupará todo el ancho, en pantallas grandes 5% del ancho) */}
      <div className="w-full sm:w-[20%] min-w-[60px]">
        <EmployeesFilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
      </div>

      {/* Área principal de carnets (en pantallas pequeñas ocupará todo el ancho, en pantallas grandes 95% del ancho) */}
      <div className="w-full sm:w-[80%]">
        <ViewEmployeesForm 
          onFormChange={handleFormChange} 
          activeFilters={activeFilters} 
        />
      </div>
    </div>
  );
};

export default ViewEmployees;
