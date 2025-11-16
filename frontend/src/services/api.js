// frontend/src/services/api.js
import axios from 'axios';

// Always use environment variable in production
const API_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== "")
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000/api";

console.log("🔗 Using API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, // ✅ CHANGED: Set to false to avoid CORS credential issues
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // Add timeout for better error handling
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    
    if (error.response) {
      console.error('Response Error:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('No Response received');
    }
    
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAllProducts: () => api.get('/products'), // ✅ CORRECT
  getProductBySlug: (slug) => api.get(`/products/${slug}`), // ✅ FIXED: Changed from template literal to parentheses
};

export default api;
