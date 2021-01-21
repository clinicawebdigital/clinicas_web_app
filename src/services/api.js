import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sistemaevolutioclinica.victorsobreira.com.br/',
});

export default api;
