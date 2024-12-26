import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!! ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin":"http://localhost:8080" 
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": true,
    // 'Authorization': 'Bearer your-auth-token',
  },
});

export default api;