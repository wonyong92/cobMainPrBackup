
import axios from 'axios';
import { config } from '../config/config'

const AxiosInstance = axios.create({
    withCredentials: false,
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosInstance;
