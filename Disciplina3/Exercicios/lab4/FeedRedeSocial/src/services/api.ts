import axios from 'axios';
import { notifications } from '@mantine/notifications';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição: adiciona o token simulado
api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer MOCK-TOKEN';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta: captura erros globalmente e exibe notificação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Falha na comunicação com o servidor.';

    notifications.show({
      title: `Erro de Comunicação ${status ? `(${status})` : ''}`,
      message: `Não foi possível completar a requisição à API: ${message}`,
      color: 'red',
      autoClose: 5000,
    });

    return Promise.reject(error);
  }
);

export default api;
