import { API } from '../conf/routeApi.js'

export const getAllSalesRequest = () => axios.get(`${API}/sales`);

export const getTodaySalesRequest = () => axios.get(`${API}/sales/today`);

export const addSaleRequest = (data) => axios.post(`${API}/sales/addSale`, data); 

export const getSaleRequest = id => axios.get(`${API}/sales/${id}`);

export const putSaleRequest = (id, data) => axios.put(`${API}/sales/${id}`, data);

export const deleteSaleRequest = id => axios.delete(`${API}/sales/${id}`, id);