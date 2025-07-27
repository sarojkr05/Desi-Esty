import axios from 'axios';
import store from '../redux/store';

const axiosInstance = axios.create() // Create an instance of axios

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL // Set the base URL from environment variables

axiosInstance.defaults.withCredentials = true // Allow credentials to be sent with requests

export default axiosInstance // Export the configured axios instance for use in other parts of the application

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            store.dis
        }
    }
)