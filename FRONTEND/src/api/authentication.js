import axios from "./axios.js";
import { API } from "./conf/routeApi.js";

export const loginRequest = data => axios.post(`${API}/login`, data);

export const logoutRequest = () => axios.post(`${API}/logout`);

export const validateTokenRequest = async () => {
    try {
      const response = await axios.get(`${API}/verify`);
      return response;
    } catch (error) {
      console.error('Error en validateTokenRequest:', error.response?.data || error.message);
    }
  };
  

export const validatePasswordRequest = user => axios.post(`${API}/verifyPassword`, user);

export const updateUserRequest = async (updatedUser) => {
  console.log(updatedUser); // Verifica que el _id esté presente
  try {
    const response = await axios.put(`/api/users/${updatedUser._id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
};
