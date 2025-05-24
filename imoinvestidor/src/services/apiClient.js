import axios from 'axios';

const API_BASE = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL.replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
