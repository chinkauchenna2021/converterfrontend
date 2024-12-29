import axios from 'axios';

const api = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_SERVER_URL),
  headers: {
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin":["https://convertserver.onrender.com","http://localhost:8080"]
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": true,
    // 'Authorization': 'Bearer your-auth-token',
  },
});

export default api;