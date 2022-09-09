import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://localhost:8000',
  validateStatus: false,
});

export default request;