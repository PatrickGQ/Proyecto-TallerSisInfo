import axios from './axios.js'
import { API } from './conf/routeApi.js';
 
export const getBranchsRequest = () => axios.get(`${API}/branchs`);

export const addProductToBranchRequest = ( data ) => axios.post(`${API}/branch/products/addProduct`, data);

export const getProductsByBranchRequest = ( nameBranch ) => axios.post(`${API}/branch/products/getProducts`, {"nameBranch": nameBranch});

export const addSaleToBranchRequest = (data) => axios.post(`${API}/branch/sales/addSale`, data);