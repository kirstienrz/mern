// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // Change to your backend URL
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
