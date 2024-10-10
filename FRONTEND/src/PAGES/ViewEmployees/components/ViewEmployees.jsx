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
    <div className="flex gap-4 p-4">
      {/* Panel de Filtros (5% del ancho) */}
      <div className="w-[5%] min-w-[60px]">
        <EmployeesFilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
      </div>

      {/* Área principal de carnets (95% del ancho) */}
      <div className="w-[95%]">
        <ViewEmployeesForm 
          onFormChange={handleFormChange} 
          activeFilters={activeFilters} 
        />
      </div>
    </div>
  );
};

export default ViewEmployees;