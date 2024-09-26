import axios from './axios.js';
import { API } from './conf/routeApi.js';

export const registerSaleRequest = (sale) => axios.post(`${API}/sales`, sale);

