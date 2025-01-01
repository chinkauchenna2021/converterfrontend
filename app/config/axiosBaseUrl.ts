import axios from 'axios';

const api = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_SERVER_URL),
  headers: {
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin":"http://localhost:8080/"
  },
});

export default api;