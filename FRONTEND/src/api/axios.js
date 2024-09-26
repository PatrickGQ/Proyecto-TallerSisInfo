import axios from 'axios'
import { API } from '../conf/routeApi.js'


const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export default instance;