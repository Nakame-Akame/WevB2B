const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, { status = 0, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    // status 0 = no hubo respuesta del servidor (sin conexión, CORS o servidor apagado).
    this.status = status;
    this.cause = cause;
  }
}

export async function apiClient(path, { headers, ...options } = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...headers },
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('No hubo respuesta del servidor.', { status: 0, cause: error });
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new ApiError(payload.message ?? 'La solicitud falló.', { status: response.status });
  }

  return response.json();
}
