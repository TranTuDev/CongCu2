// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // hoặc domain BE
  withCredentials: true, // nếu dùng cookie/session
});

export const register = async (data) => {
  return API.post('/register', data);
};
