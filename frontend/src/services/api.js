import axios from 'axios';

// Always use environment variable in production
const API_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== "")
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000/api";

console.log("🔗 Using API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductBySlug: (slug) => api.get(`/products/${slug}`),
};

export default api;
