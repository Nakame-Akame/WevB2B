import { apiClient } from './apiClient.js';

export async function fetchProducts() {
  return apiClient('/products?page=1&limit=12');
}
