// import axios from 'axios';
// const axiosInstance = axios.create() // Create an instance of axios

// axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL // Set the base URL from environment variables

// axiosInstance.defaults.withCredentials = true // Allow credentials to be sent with requests

// export default axiosInstance // Export the configured axios instance for use in other parts of the application


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", 
  withCredentials: true                     
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
