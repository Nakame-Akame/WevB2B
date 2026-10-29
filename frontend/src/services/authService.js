import { apiClient } from './apiClient.js';

export async function login(credentials) {
  return apiClient('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
}
