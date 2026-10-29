import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Product API', () => {
  it('returns a health status object', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('lists products', async () => {
    const response = await request(app).get('/api/v1/products?page=1&limit=10');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
