import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: inject JWT token if stored
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: friendly notifications on network / API errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    let message = 'Ocorreu um erro inesperado ao se comunicar com o servidor.';

    if (!error.response) {
      message = 'Falha na conexão com a internet. Verifique sua rede.';
    } else if (error.response.status === 401) {
      message = error.response.data?.message || 'Sessão expirada ou credenciais inválidas.';
    } else if (error.response.status === 403) {
      message = 'Acesso não autorizado para este recurso.';
    } else if (error.response.status === 404) {
      message = 'Recurso não encontrado.';
    } else if (error.response.data?.message) {
      message = error.response.data.message;
    }

    // Only show notification if running in browser environment (not SSR / tests without DOM)
    if (typeof window !== 'undefined') {
      try {
        notifications.show({
          title: 'Erro de Comunicação',
          message,
          color: 'red',
          autoClose: 5000,
        });
      } catch {
        // Fallback silently if notification context is not yet mounted
      }
    }

    return Promise.reject(error);
  },
);

export default api;
