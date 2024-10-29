import axios from './axios.js'
import { API } from './conf/routeApi.js';
 
export const getBranchsRequest = () => axios.get(`${API}/branches`);

export const addProductToBranchRequest = ( data ) => axios.post(`${API}/branch/products/addProduct`, data);

export const getProductsByBranchRequest = ( nameBranch ) => axios.post(`${API}/branch/products/getProducts`, {"nameBranch": nameBranch});

export const addSaleToBranchRequest = (data) => axios.post(`${API}/branch/sales/addSale`, data);

export const getSalesByBranchRequest = (nameBranch) => axios.post(`${API}/branch/sales/getSales`, {"nameBranch": nameBranch});

export const getTodaySalesByBranchRequest = (nameBranch) => axios.post(`${API}/branch/sales/getTodaySales`, {"nameBranch": nameBranch});

export const getSalesByDateRequest = (nameBranch) => axios.post(`${API}/branch/sales/getByDate/${date}`, {"nameBranch": nameBranch});

export const addEmployeeToBranchRequest = (data) => axios.post(`${API}/branch/employees/addEmployee`, data);

// Solicitud para obtener empleados por sucursal
export const getEmployeesByBranchRequest = (branchName) => axios.get(`${API}/branch/employees/getEmployeesByBranch/${branchName}`);

// Solicitud para obtener un empleado por ID
export const getEmployeeByIdRequest = (id) => axios.get(`${API}/branch/employees/getEmployeeById/${id}`);

// Solicitud para obtener empleados con filtros
export const getEmployeesWithFiltersRequest = (branchName, filters) => {
    return axios.get(`${API}/branch/employees/getEmployeesWithFilters`, { 
        params: { branchName, ...filters } 
    });
};

// Funciones de inventario relacionadas con sucursales
export const addInventoryToBranchRequest = (data) => 
    axios.post(`${API}/branch/inventory/addInventory`, data);
  
export const getDailyInventoryByBranchRequest = (nameBranch) => 
    axios.get(`${API}/branch/inventory/branch/${nameBranch}`);
  
export const getCurrentDayInventoryByBranchRequest = (nameBranch) => 
    axios.get(`${API}/branch/inventory/current/${nameBranch}`);
  
export const getInventoryByDateAndBranchRequest = (nameBranch, date) => 
    axios.get(`${API}/branch/inventory/date/${nameBranch}/${date}`);
  
export const updateBranchInventoryRequest = (id, data) => 
    axios.put(`${API}/branch/inventory/update/${id}`, data);
  
export const getInventoryStatsByBranchRequest = (nameBranch) => 
    axios.get(`${API}/branch/inventory/stats/${nameBranch}`);