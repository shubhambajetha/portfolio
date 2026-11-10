import axios, { AxiosInstance } from "axios";
import { config, getApiBaseUrl } from "../lib/config";

const api: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: config.timeoutMs || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = api;
