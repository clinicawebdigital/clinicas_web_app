import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.victorsobreira.com.br/',
});

export default api;
