import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키 포함
  });
  
  export default apiClient;