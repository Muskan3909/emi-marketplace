
import axios from 'axios';

// Always use environment variable in production
const API_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== "")
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000/api";

console.log("🔗 Using API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // Increased to 60 seconds for Render cold starts
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
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request Timeout - Server might be waking up');
    } else if (error.response) {
      console.error('Response Error:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('🌐 No Response received - Check network/server');
    }
    
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductBySlug: (slug) => api.get(`/products/${slug}`),
};

export default api;
