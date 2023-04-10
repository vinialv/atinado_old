import axios from 'axios';

const api = axios.create({
  baseURL: 'http://atinado.com.br/app',
});

export default api;
