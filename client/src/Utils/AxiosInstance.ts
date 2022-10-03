import axios from 'axios';
import { config } from '../config/config';

const token = localStorage.getItem('token');
const AxiosInstance = axios.create({
 baseURL: config.apiUrl,
 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
{
  token ? (AxiosInstance.defaults.headers.common['Authorization'] = token) : null;
}

export default AxiosInstance;