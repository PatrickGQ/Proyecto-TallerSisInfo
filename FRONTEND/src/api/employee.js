import axios from "axios";
import { API } from "./conf/routeApi";



export const registerEmployeeRequest = (employee) => axios.post(`${API}/employees`, employee);