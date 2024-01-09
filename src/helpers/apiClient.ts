import axios, { AxiosRequestConfig } from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'x-api-key': apiKey,
  },
});

type ApiClient = {
  get: <T>(url: string, params?: AxiosRequestConfig['params']) => Promise<T>;
  post: <T, D>(url: string, data?: D) => Promise<T>;
  put: <T, D>(url: string, data?: D) => Promise<T>;
  delete: <T>(url: string, params?: AxiosRequestConfig['params']) => Promise<T>;
};

const apiClient: ApiClient = {
  get: async <T>(url: string, params?: AxiosRequestConfig['params']) => {
    const response = await httpClient.get<T>(url, { params });
    return response.data;
  },
  post: async <T, D>(url: string, data?: D) => {
    const response = await httpClient.post<T>(url, data);
    return response.data;
  },
  put: async <T, D>(url: string, data?: D) => {
    const response = await httpClient.put<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string, params?: AxiosRequestConfig['params']) => {
    const response = await httpClient.delete<T>(url, { params });
    return response.data;
  },
};

export default apiClient;
