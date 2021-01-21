import axios from 'axios';

const api = axios.create({
  baseURL: 'https://evolutioclinica.netlify.app/',
});

export default api;
