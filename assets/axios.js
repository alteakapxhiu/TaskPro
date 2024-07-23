import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8000',
  timeout: 10000, // Increase timeout to 15 seconds
});

export default instance;
