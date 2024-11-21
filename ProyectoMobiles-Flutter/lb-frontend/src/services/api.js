// src/services/api.js
import axios from 'axios';

// URL base constante
const API_URL = "http://localhost:8080"; 

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}` // Si necesitas autorización
  },
});

// Manejo de errores
const handleError = (error) => {
  console.error('Error en la solicitud:', error);
  
  if (error.response) {
    return {
      message: error.response.data?.message || 'Error en la solicitud',
      status: error.response.status,
    };
  } else if (error.request) {
    return { message: 'No se recibió respuesta del servidor', status: null };
  } else {
    return { message: error.message, status: null };
  }
};

// Función para hacer solicitudes POST
export const apiPost = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Retorna la respuesta
  } catch (error) {
    throw new Error(handleError(error).message); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes GET
export const apiGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error).message); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes PUT
export const apiPut = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error).message); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes DELETE
export const apiDelete = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error).message); // Usar la función de manejo de errores
  }
};

// Interceptors para manejar globalmente errores o peticiones
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes agregar lógica para manejar errores globalmente aquí
    return Promise.reject(handleError(error));
  }
);