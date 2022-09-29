
import axios from 'axios';
import { config } from '../config/config'


const AxiosInstance = axios.create({
  
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export default AxiosInstance;
